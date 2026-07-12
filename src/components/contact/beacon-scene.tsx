// src/components/contact/beacon-scene.tsx
"use client";

import { Edges } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ICE = new THREE.Color("#7dd3fc");
const AURORA = new THREE.Color("#5eead4");
const PLASMA = new THREE.Color("#c084fc");
const EMBER = new THREE.Color("#ff6b3d");

// Four rings = the four real channels on this page (email + the three
// socialLinks). Tilted like an armillary sphere so they interlock into
// one deliberate silhouette even frozen mid-frame — the shard field's
// actual flaw was that a screenshot of it just looked like debris.
const RING_RADIUS = 1.55;
const RINGS = [
  { tilt: new THREE.Euler(0.28, 0, 0), speed: 0.2, color: ICE },
  { tilt: new THREE.Euler(1.05, 0.65, 0), speed: -0.15, color: AURORA },
  { tilt: new THREE.Euler(0.85, -0.95, 0.35), speed: 0.12, color: ICE },
  { tilt: new THREE.Euler(-0.4, 0.5, 1.05), speed: -0.17, color: AURORA },
] as const;

interface Handshake {
  active: boolean;
  phase: "out" | "back";
  t: number;
  origin: THREE.Vector3;
  control: THREE.Vector3;
}

function RelayField({
  animate,
  lowDetail,
}: {
  animate: boolean;
  lowDetail: boolean;
}) {
  const outer = useRef<THREE.Group>(null);
  const flareRef = useRef<THREE.Mesh>(null);
  const markerRefs = useRef<(THREE.Mesh | null)[]>([]);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const ringAngles = useRef<number[]>(RINGS.map((_, i) => (i * Math.PI) / 2));
  const ringQuats = useMemo(
    () => RINGS.map((r) => new THREE.Quaternion().setFromEuler(r.tilt)),
    [],
  );

  const pulsePoolSize = lowDetail ? 1 : 2;
  const handshakes = useRef<Handshake[]>(
    Array.from({ length: pulsePoolSize }, () => ({
      active: false,
      phase: "out" as const,
      t: 0,
      origin: new THREE.Vector3(),
      control: new THREE.Vector3(),
    })),
  );
  const nextSpawn = useRef(1.4);

  const dustPositions = useMemo(() => {
    const count = lowDetail ? 8 : 16;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.6 + Math.random() * 1.4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [lowDetail]);

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((state, delta) => {
    if (!animate) return; // static composition beyond this — reduced motion
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;

    if (outer.current) {
      outer.current.rotation.y = THREE.MathUtils.lerp(
        outer.current.rotation.y,
        time * 0.03 + pointer.current.x * 0.2,
        0.035,
      );
      outer.current.rotation.x = THREE.MathUtils.lerp(
        outer.current.rotation.x,
        pointer.current.y * -0.1,
        0.035,
      );
    }

    if (flareRef.current) {
      const breathe = 0.5 + Math.sin(time * 1.3) * 0.5;
      flareRef.current.scale.setScalar(0.28 + breathe * 0.045);
      const mat = flareRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity =
        mat.emissiveIntensity > 1.05
          ? THREE.MathUtils.lerp(mat.emissiveIntensity, 0.65, 0.05)
          : 0.55 + breathe * 0.3;
    }

    RINGS.forEach((ring, i) => {
      ringAngles.current[i] += ring.speed * dt;
      const marker = markerRefs.current[i];
      if (marker) {
        marker.position.set(
          Math.cos(ringAngles.current[i]) * RING_RADIUS,
          Math.sin(ringAngles.current[i]) * RING_RADIUS,
          0,
        );
      }
    });

    nextSpawn.current -= dt;
    if (nextSpawn.current <= 0) {
      const free = handshakes.current.find((h) => !h.active);
      if (free) {
        const ringIndex = Math.floor(Math.random() * RINGS.length);
        const theta = ringAngles.current[ringIndex];
        const localPos = new THREE.Vector3(
          Math.cos(theta) * RING_RADIUS,
          Math.sin(theta) * RING_RADIUS,
          0,
        ).applyQuaternion(ringQuats[ringIndex]);

        free.active = true;
        free.phase = "out";
        free.t = 0;
        free.origin.copy(localPos);
        free.control
          .copy(localPos)
          .multiplyScalar(0.45)
          .add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 0.5,
              (Math.random() - 0.5) * 0.5,
              (Math.random() - 0.5) * 0.5,
            ),
          );
      }
      nextSpawn.current = 2.2 + Math.random() * 1.6;
    }

    handshakes.current.forEach((hs, poolIdx) => {
      if (!hs.active) return;
      const pulse = pulseRefs.current[poolIdx];
      if (!pulse) return;

      const speed = hs.phase === "out" ? 0.85 : 0.65;
      hs.t = Math.min(hs.t + dt * speed, 1);

      const from = hs.phase === "out" ? hs.origin : new THREE.Vector3(0, 0, 0);
      const to = hs.phase === "out" ? new THREE.Vector3(0, 0, 0) : hs.origin;
      const curve = new THREE.QuadraticBezierCurve3(from, hs.control, to);
      pulse.position.copy(curve.getPointAt(hs.t));
      pulse.visible = true;

      tmpColor.copy(
        hs.phase === "out"
          ? ICE.clone().lerp(PLASMA, hs.t)
          : EMBER.clone().lerp(ICE, hs.t),
      );
      (pulse.material as THREE.MeshBasicMaterial).color.copy(tmpColor);

      if (hs.t >= 1) {
        if (hs.phase === "out") {
          if (flareRef.current) {
            (
              flareRef.current.material as THREE.MeshStandardMaterial
            ).emissiveIntensity = 1.25;
          }
          hs.phase = "back";
          hs.t = 0;
        } else {
          hs.active = false;
          pulse.visible = false;
        }
      }
    });
  });

  const ringSegments = lowDetail ? 64 : 128;

  return (
    <group ref={outer} rotation={[0.1, -0.2, 0]}>
      {/* the filament — always warm, the one constant in the scene */}
      <mesh ref={flareRef} scale={0.3}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1a0d07"
          emissive="#ffb454"
          emissiveIntensity={0.85}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* the lantern shell it sits inside */}
      <mesh scale={0.58}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0d1420"
          emissive="#ff6b3d"
          emissiveIntensity={0.22}
          transparent
          opacity={0.38}
          metalness={0.4}
          roughness={0.35}
        />
        <Edges color="#ffd9a1" opacity={0.55} transparent />
      </mesh>

      {RINGS.map((ring, i) => (
        <group
          key={`ring-${ring.tilt.x}-${ring.tilt.y}`}
          rotation={[ring.tilt.x, ring.tilt.y, ring.tilt.z]}
        >
          <mesh>
            <torusGeometry args={[RING_RADIUS, 0.006, 8, ringSegments]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.4} />
          </mesh>
          <mesh
            position={[RING_RADIUS, 0, 0]}
            ref={(el) => {
              markerRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color={ring.color} />
          </mesh>
        </group>
      ))}

      {["pulse-0", "pulse-1", "pulse-2", "pulse-3", "pulse-4"]
        .slice(0, pulsePoolSize)
        .map((key, i) => (
          <mesh
            key={key}
            visible={false}
            ref={(el) => {
              pulseRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#7dd3fc" />
          </mesh>
        ))}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7dd3fc"
          size={0.014}
          transparent
          opacity={0.22}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export interface BeaconSceneProps {
  animate: boolean;
  maxDpr: number;
  lowDetail: boolean;
}

export default function BeaconScene({
  animate,
  maxDpr,
  lowDetail,
}: BeaconSceneProps) {
  return (
    <Canvas
      camera={{ position: [0.3, 0.15, 6.0], fov: 32 }}
      dpr={[1, maxDpr]}
      frameloop={animate ? "always" : "demand"}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      className="pointer-events-none"
      aria-hidden
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 5]} intensity={26} color="#ffb454" />
      <pointLight position={[-4, -2, 4]} intensity={16} color="#7dd3fc" />
      <pointLight position={[0, 0, 3]} intensity={10} color="#ff6b3d" />
      <RelayField animate={animate} lowDetail={lowDetail} />
    </Canvas>
  );
}
