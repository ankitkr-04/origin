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

const FIELD_RADIUS = 2.3;

interface Shard {
  position: THREE.Vector3;
  scale: number;
  spinAxis: THREE.Vector3;
  spinSpeed: number;
  driftPhase: number;
  driftSpeed: number;
}

function buildShards(count: number): Shard[] {
  const shards: Shard[] = [];
  for (let i = 0; i < count; i++) {
    // Jittered spherical shell, biased away from center so the core
    // reads as its own object rather than buried in the field.
    const u = Math.random();
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = (0.42 + Math.cbrt(u) * 0.58) * FIELD_RADIUS;
    shards.push({
      position: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ),
      scale: 0.055 + Math.random() * 0.09,
      spinAxis: new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize(),
      spinSpeed: 0.2 + Math.random() * 0.5,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: 0.15 + Math.random() * 0.25,
    });
  }
  return shards;
}

interface Handshake {
  active: boolean;
  shardIndex: number;
  phase: "out" | "back";
  t: number;
  control: THREE.Vector3;
}

function BeaconField({
  animate,
  lowDetail,
}: {
  animate: boolean;
  lowDetail: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  const count = lowDetail ? 26 : 44;
  const pulsePoolSize = lowDetail ? 2 : 3;

  const shards = useMemo(() => buildShards(count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const pulseKeys = useMemo(
    () => Array.from({ length: pulsePoolSize }, (_, i) => `pulse-${i}`),
    [pulsePoolSize],
  );

  const handshakes = useRef<Handshake[]>(
    Array.from({ length: pulsePoolSize }, () => ({
      active: false,
      shardIndex: 0,
      phase: "out" as const,
      t: 0,
      control: new THREE.Vector3(),
    })),
  );
  const nextSpawn = useRef(1.2);

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  // Paint the resting field once — cold, per the thermal law: heat is
  // earned by interaction, never the default. Static orientation too,
  // so prefers-reduced-motion gets a correct single-frame render.
  useEffect(() => {
    const mesh = instancedRef.current;
    if (!mesh) return;
    shards.forEach((shard, i) => {
      dummy.position.copy(shard.position);
      dummy.quaternion.setFromAxisAngle(shard.spinAxis, shard.driftPhase);
      dummy.scale.setScalar(shard.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      tmpColor.copy(Math.random() > 0.72 ? AURORA : ICE);
      mesh.setColorAt(i, tmpColor);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [shards, dummy, tmpColor]);

  useFrame((state, delta) => {
    if (!animate) return; // static beyond this point — reduced motion
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        time * 0.028 + pointer.current.x * 0.2,
        0.035,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.current.y * -0.1,
        0.035,
      );
    }

    // The beacon — always warm, gently breathing. The one constant heat
    // source: Ankit, waiting to hear from you.
    if (coreRef.current) {
      const breathe = 0.5 + Math.sin(time * 1.3) * 0.5;
      coreRef.current.scale.setScalar(0.32 + breathe * 0.05);
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      if (material.emissiveIntensity < 1.1) {
        material.emissiveIntensity = 0.65 + breathe * 0.3;
      } else {
        material.emissiveIntensity = THREE.MathUtils.lerp(
          material.emissiveIntensity,
          0.65,
          0.06,
        );
      }
    }

    const mesh = instancedRef.current;
    if (mesh) {
      shards.forEach((shard, i) => {
        const wobble =
          Math.sin(time * shard.driftSpeed + shard.driftPhase) * 0.05;
        dummy.position
          .copy(shard.position)
          .addScaledVector(shard.position.clone().normalize(), wobble);
        dummy.quaternion.setFromAxisAngle(
          shard.spinAxis,
          shard.driftPhase + time * shard.spinSpeed,
        );
        dummy.scale.setScalar(shard.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }

    // Handshake scheduler — a few concurrent exchanges at most, spaced
    // out so the field reads as calm, not chattery.
    nextSpawn.current -= dt;
    if (nextSpawn.current <= 0) {
      const free = handshakes.current.find((h) => !h.active);
      if (free) {
        free.active = true;
        free.phase = "out";
        free.t = 0;
        free.shardIndex = Math.floor(Math.random() * count);
        const shardPos = shards[free.shardIndex].position;
        free.control
          .copy(shardPos)
          .multiplyScalar(0.5)
          .add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 0.6,
              (Math.random() - 0.5) * 0.6,
              (Math.random() - 0.5) * 0.6,
            ),
          );
      }
      nextSpawn.current = 1.4 + Math.random() * 1.6;
    }

    handshakes.current.forEach((hs, poolIdx) => {
      if (!hs.active) return;
      const pulseMesh = pulseRefs.current[poolIdx];
      if (!pulseMesh) return;

      const shardPos = shards[hs.shardIndex].position;
      const speed = hs.phase === "out" ? 0.9 : 0.7;
      hs.t = Math.min(hs.t + dt * speed, 1);

      const from = hs.phase === "out" ? shardPos : new THREE.Vector3(0, 0, 0);
      const to = hs.phase === "out" ? new THREE.Vector3(0, 0, 0) : shardPos;
      const curve = new THREE.QuadraticBezierCurve3(from, hs.control, to);
      pulseMesh.position.copy(curve.getPointAt(hs.t));
      pulseMesh.visible = true;

      tmpColor.copy(
        hs.phase === "out"
          ? ICE.clone().lerp(PLASMA, hs.t)
          : EMBER.clone().lerp(ICE, hs.t),
      );
      (pulseMesh.material as THREE.MeshBasicMaterial).color.copy(tmpColor);

      if (hs.t >= 1) {
        if (hs.phase === "out") {
          if (coreRef.current) {
            (
              coreRef.current.material as THREE.MeshStandardMaterial
            ).emissiveIntensity = 1.3;
          }
          hs.phase = "back";
          hs.t = 0;
        } else {
          hs.active = false;
          pulseMesh.visible = false;
        }
      }
    });
  });

  return (
    <group ref={group} rotation={[0.12, -0.25, 0]}>
      <mesh ref={coreRef} scale={0.34}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#170b06"
          emissive="#ff6b3d"
          emissiveIntensity={0.85}
          metalness={0.7}
          roughness={0.32}
        />
        <Edges color="#ffd9a1" opacity={0.85} transparent />
      </mesh>

      <instancedMesh ref={instancedRef} args={[undefined, undefined, count]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.55}
          roughness={0.35}
          emissive="#0a1120"
          emissiveIntensity={0.4}
        />
      </instancedMesh>

      {pulseKeys.map((key, i) => (
        <mesh
          key={key}
          visible={false}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#7dd3fc" />
        </mesh>
      ))}
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
      camera={{ position: [0.4, 0.2, 6.6], fov: 34 }}
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
      <BeaconField animate={animate} lowDetail={lowDetail} />
    </Canvas>
  );
}
