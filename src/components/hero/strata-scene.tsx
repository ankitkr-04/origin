"use client";

import { Edges } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The signature scene: an abstracted LSM-tree — five strata slabs widening as
 * data settles downward, with write "particles" flushing through the levels.
 */

const SLABS = [
  { size: [1.5, 0.14, 1.5], y: 1.55, edge: "#e8a33d", edgeOpacity: 0.95 },
  { size: [2.0, 0.16, 2.0], y: 0.85, edge: "#dd9038", edgeOpacity: 0.7 },
  { size: [2.55, 0.18, 2.55], y: 0.1, edge: "#c77a35", edgeOpacity: 0.5 },
  { size: [3.15, 0.2, 3.15], y: -0.7, edge: "#a8623a", edgeOpacity: 0.35 },
  { size: [3.8, 0.22, 3.8], y: -1.55, edge: "#7a5040", edgeOpacity: 0.25 },
] as const;

const FALL_SPEED = 0.45;
const COLUMN_TOP = 2.4;
const COLUMN_BOTTOM = -2.1;

function StrataStack({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(0);

  // The canvas has pointer-events: none so it never blocks the page, so
  // parallax input comes from a window-level listener instead of R3F events.
  useEffect(() => {
    if (!animate) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((_, delta) => {
    if (!animate || !group.current) return;
    const dt = Math.min(delta, 0.05);
    spin.current += dt * 0.12;
    const g = group.current;
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      spin.current + pointer.current.x * 0.3,
      0.06,
    );
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      pointer.current.y * -0.1,
      0.06,
    );
  });

  return (
    <group ref={group} rotation={[0, 0.5, 0]}>
      {SLABS.map((slab, i) => (
        <mesh
          key={slab.y}
          position={[0, slab.y, 0]}
          rotation={[0, i * 0.14, 0]}
        >
          <boxGeometry args={[...slab.size]} />
          <meshStandardMaterial
            color="#131822"
            metalness={0.55}
            roughness={0.38}
            transparent
            opacity={0.92}
          />
          <Edges color={slab.edge} opacity={slab.edgeOpacity} transparent />
        </mesh>
      ))}
      <FlushParticles animate={animate} />
    </group>
  );
}

function FlushParticles({
  animate,
  count = 280,
}: {
  animate: boolean;
  count?: number;
}) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.7;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] =
        COLUMN_BOTTOM + Math.random() * (COLUMN_TOP - COLUMN_BOTTOM);
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      speeds[i] = 0.4 + Math.random() * 0.8;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!animate || !points.current) return;
    const dt = Math.min(delta, 0.05);
    const attr = points.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= FALL_SPEED * speeds[i] * dt;
      if (arr[i * 3 + 1] < COLUMN_BOTTOM) arr[i * 3 + 1] = COLUMN_TOP;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#e8a33d"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface StrataSceneProps {
  animate: boolean;
  /** Lower device-pixel-ratio ceiling on small screens. */
  maxDpr: number;
}

export default function StrataScene({ animate, maxDpr }: StrataSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6.4], fov: 40 }}
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
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 5, 4]} intensity={40} color="#e8a33d" />
      <pointLight position={[-5, -2, 3]} intensity={18} color="#4a5a78" />
      <StrataStack animate={animate} />
    </Canvas>
  );
}
