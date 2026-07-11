"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Contact page scene: an aurora core suspended in a cold field.
 * It stays distinct from the homepage — no globe grid, just a warm
 * handshake under a rotating cold shell.
 */

const RADIUS = 2;

/** Thin vertex-colored ring above the pole, shifting teal ↔ plasma. */
function useAuroraRing(segments = 96) {
  return useMemo(() => {
    const positions = new Float32Array((segments + 1) * 3);
    const colors = new Float32Array((segments + 1) * 3);
    const teal = new THREE.Color("#5eead4");
    const plasma = new THREE.Color("#c084fc");
    const c = new THREE.Color();
    const lat = (55 * Math.PI) / 180;
    const y = Math.sin(lat) * RADIUS * 1.03;
    const r = Math.cos(lat) * RADIUS * 1.03;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      c.lerpColors(teal, plasma, (Math.sin(theta * 3) + 1) / 2).toArray(
        colors,
        i * 3,
      );
    }
    return { positions, colors };
  }, [segments]);
}

function randomSurfacePoint(radius: number): THREE.Vector3 {
  return new THREE.Vector3().randomDirection().setLength(radius);
}

function Globe({ animate, dotCount }: { animate: boolean; dotCount: number }) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(0);

  const aurora = useAuroraRing();

  const { dots, shards, sparkColors } = useMemo(() => {
    const dots = new Float32Array(dotCount * 3);
    const shards = new Float32Array(72 * 3);
    const sparkColors = new Float32Array(72 * 3);
    const color = new THREE.Color();
    for (let i = 0; i < dotCount; i++) {
      randomSurfacePoint(RADIUS * 0.92).toArray(dots, i * 3);
    }
    for (let i = 0; i < 72; i++) {
      randomSurfacePoint(RADIUS * 1.5).toArray(shards, i * 3);
      color
        .lerpColors(
          i % 3 === 0 ? new THREE.Color("#7dd3fc") : new THREE.Color("#ff6b3d"),
          new THREE.Color("#c084fc"),
          (i % 9) / 8,
        )
        .toArray(sparkColors, i * 3);
    }
    return { dots, shards, sparkColors };
  }, [dotCount]);

  useEffect(() => {
    if (!animate) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((state, delta) => {
    if (!animate || !group.current) return;
    const dt = Math.min(delta, 0.05);
    spin.current += dt * 0.1;
    const g = group.current;
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      spin.current + pointer.current.x * 0.25,
      0.06,
    );
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      0.35 + pointer.current.y * 0.12,
      0.06,
    );
    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.52 + Math.sin(state.clock.elapsedTime * 2.2) * 0.3;
    }
    if (shellRef.current) {
      const material = shellRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.14 + Math.sin(state.clock.elapsedTime * 0.9) * 0.04;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0, -0.15]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dots, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#7dd3fc"
          transparent
          opacity={0.42}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[shards, 3]} />
          <bufferAttribute attach="attributes-color" args={[sparkColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[RADIUS * 0.95, 3]} />
        <meshStandardMaterial
          color="#0a1120"
          emissive="#ff6b3d"
          emissiveIntensity={0.52}
          metalness={0.8}
          roughness={0.32}
        />
      </mesh>

      <mesh ref={shellRef}>
        <sphereGeometry args={[RADIUS * 1.18, 32, 32]} />
        <meshStandardMaterial
          color="#101a2c"
          emissive="#5eead4"
          emissiveIntensity={0.12}
          transparent
          opacity={0.16}
          metalness={0.2}
          roughness={0.18}
        />
      </mesh>

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[aurora.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[aurora.colors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </line>
    </group>
  );
}

interface GlobeSceneProps {
  animate: boolean;
  maxDpr: number;
  /** Icosahedron subdivision level — lower on small screens. */
  detail: number;
}

export default function GlobeScene({
  animate,
  maxDpr,
  detail,
}: GlobeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.1], fov: 42 }}
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
      <Globe animate={animate} dotCount={detail} />
    </Canvas>
  );
}
