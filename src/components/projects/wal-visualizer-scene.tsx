"use client";

import { RoundedBox, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const NUM_SLOTS = 16;
const RADIUS = 4.5;

// Colors
const COLORS = {
  EMPTY: new THREE.Color("#0a2530"), // dim ice
  WRITING: new THREE.Color("#ff6b3d"), // ember
  SEALED: new THREE.Color("#ffb454"), // flame
  FLUSHED: new THREE.Color("#5eead4"), // aurora
};

type SlotState = "EMPTY" | "WRITING" | "SEALED" | "FLUSHED";

interface SlotData {
  state: SlotState;
  color: THREE.Color;
  targetColor: THREE.Color;
}

function RingBuffer({
  appendCounter,
  onEpochChange,
}: {
  appendCounter: number;
  onEpochChange: (epoch: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // State refs for the animation loop
  const slotsRef = useRef<SlotData[]>(
    Array.from({ length: NUM_SLOTS }, () => ({
      state: "EMPTY",
      color: COLORS.EMPTY.clone(),
      targetColor: COLORS.EMPTY.clone(),
    })),
  );

  const pendingAppends = useRef(0);
  const prevAppendCounter = useRef(appendCounter);
  const nextEmptySlotIndex = useRef(0);
  const epoch = useRef(1);

  // Packet animation state
  const packetRef = useRef<{
    active: boolean;
    progress: number;
    targetIndex: number;
    start: THREE.Vector3;
    control: THREE.Vector3;
    end: THREE.Vector3;
  }>({
    active: false,
    progress: 0,
    targetIndex: 0,
    start: new THREE.Vector3(),
    control: new THREE.Vector3(),
    end: new THREE.Vector3(),
  });

  const packetMeshRef = useRef<THREE.Mesh>(null);
  const packetLightRef = useRef<THREE.PointLight>(null);

  // Flush animation state
  const flushTimer = useRef(0);
  const isFlushing = useRef(false);

  // Pre-calculate slot positions
  const slotPositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < NUM_SLOTS; i++) {
      const angle = (i / NUM_SLOTS) * Math.PI * 2;
      pos.push(
        new THREE.Vector3(
          Math.cos(angle) * RADIUS,
          0,
          Math.sin(angle) * RADIUS,
        ),
      );
    }
    return pos;
  }, []);

  // Material refs for each slot to update colors directly
  const materialRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  // Listen for new appends
  useEffect(() => {
    if (appendCounter > prevAppendCounter.current) {
      const diff = appendCounter - prevAppendCounter.current;
      pendingAppends.current += diff;
      prevAppendCounter.current = appendCounter;
    }
  }, [appendCounter]);

  useFrame((state, delta) => {
    // 1. Ambient idle animation
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.2;
    }

    const dt = Math.min(delta, 0.05);

    // 2. Handle Flush Sequence
    if (isFlushing.current) {
      flushTimer.current += dt;
      if (flushTimer.current > 1.5) {
        // Complete flush, return to empty
        isFlushing.current = false;
        flushTimer.current = 0;
        slotsRef.current.forEach((s) => {
          s.state = "EMPTY";
          s.targetColor.copy(COLORS.EMPTY);
        });
        nextEmptySlotIndex.current = 0;
      }
    }

    // 3. Handle Packet Journey
    if (packetRef.current.active && !isFlushing.current) {
      packetRef.current.progress += dt * 1.5; // packet speed

      if (packetRef.current.progress >= 1) {
        // Packet arrived
        packetRef.current.active = false;
        const targetIdx = packetRef.current.targetIndex;

        // Slot becomes WRITING
        slotsRef.current[targetIdx].state = "WRITING";
        slotsRef.current[targetIdx].targetColor.copy(COLORS.WRITING);

        // After brief write, become SEALED
        setTimeout(() => {
          if (slotsRef.current[targetIdx].state === "WRITING") {
            slotsRef.current[targetIdx].state = "SEALED";
            slotsRef.current[targetIdx].targetColor.copy(COLORS.SEALED);
            epoch.current++;
            onEpochChange(epoch.current);

            // If buffer is full, trigger flush
            if (targetIdx === NUM_SLOTS - 1) {
              isFlushing.current = true;
              flushTimer.current = 0;
              slotsRef.current.forEach((s) => {
                s.state = "FLUSHED";
                s.targetColor.copy(COLORS.FLUSHED);
              });
            }
          }
        }, 300);
      } else {
        // Move packet along curve
        if (packetMeshRef.current && packetLightRef.current) {
          const { start, control, end, progress } = packetRef.current;
          // Quadratic bezier interpolation
          const p = new THREE.Vector3()
            .copy(start)
            .lerp(control, progress)
            .lerp(
              new THREE.Vector3().copy(control).lerp(end, progress),
              progress,
            );

          packetMeshRef.current.position.copy(p);

          // Fade in/out light
          const fadeIn = THREE.MathUtils.smoothstep(progress, 0, 0.1);
          const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 0.9, 1.0);
          packetLightRef.current.intensity = 8 * fadeIn * fadeOut;
        }
      }
    } else if (
      packetMeshRef.current &&
      packetLightRef.current &&
      !packetRef.current.active
    ) {
      // Hide packet when inactive
      packetMeshRef.current.scale.setScalar(0.001);
      packetLightRef.current.intensity = 0;
    }

    // 4. Dequeue next append if idle and not flushing
    if (
      !packetRef.current.active &&
      !isFlushing.current &&
      pendingAppends.current > 0
    ) {
      pendingAppends.current--;

      const targetIdx = nextEmptySlotIndex.current;
      nextEmptySlotIndex.current++;

      packetRef.current.active = true;
      packetRef.current.progress = 0;
      packetRef.current.targetIndex = targetIdx;

      // Calculate curve
      const endPos = slotPositions[targetIdx].clone();
      // Apply group rotation to find correct world space target relative to group
      // Since packet is inside the group, we just use local space!
      packetRef.current.start.set(0, -2, 0);
      packetRef.current.end.copy(endPos);

      const mid = packetRef.current.start
        .clone()
        .lerp(packetRef.current.end, 0.5);
      // Bow the curve outward and up
      const offset = new THREE.Vector3(0, 3, 0);
      packetRef.current.control.copy(mid).add(offset);

      if (packetMeshRef.current) {
        packetMeshRef.current.scale.setScalar(1);
      }
    }

    // 5. Update slot colors (smooth lerp)
    slotsRef.current.forEach((slot, i) => {
      slot.color.lerp(slot.targetColor, dt * 5);
      const mat = materialRefs.current[i];
      if (mat) {
        mat.color.copy(slot.color);
        // Add emissive glow for active states
        if (slot.state !== "EMPTY") {
          mat.emissive.copy(slot.color);
          mat.emissiveIntensity = 0.5;
        } else {
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0;
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0.4, 0, 0]}>
      {/* Core Emitter */}
      <mesh position={[0, -2, 0]}>
        <octahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#38bdf8" wireframe />
        <pointLight color="#38bdf8" intensity={2} distance={10} />
      </mesh>

      {/* Packet */}
      <mesh ref={packetMeshRef} scale={0.001}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ff6b3d" />
        <pointLight
          ref={packetLightRef}
          color="#ff6b3d"
          intensity={0}
          distance={8}
        />
      </mesh>

      {/* Slots */}
      {slotPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Connecting line to center */}
          <Line
            points={[
              [0, -2, 0],
              [0, 0, 0],
            ]}
            color="#0a2530"
            lineWidth={1}
            transparent
            opacity={0.3}
          />

          <RoundedBox
            args={[1.2, 0.4, 0.8]}
            radius={0.1}
            smoothness={2}
            rotation={[0, Math.atan2(pos.x, pos.z), 0]}
          >
            <meshStandardMaterial
              ref={(el) => {
                materialRefs.current[i] = el;
              }}
              color={COLORS.EMPTY}
              metalness={0.4}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

export default function WalVisualizerScene({
  appendCounter,
  onEpochChange,
}: {
  appendCounter: number;
  onEpochChange: (epoch: number) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 45 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
      }}
      dpr={[1, 2]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} />

      <RingBuffer appendCounter={appendCounter} onEpochChange={onEpochChange} />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
      </EffectComposer>
    </Canvas>
  );
}
