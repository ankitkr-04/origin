"use client";

import { Edges } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The signature scene: an abstracted LSM-tree with THERMAL physics.
 * The top slab is the memtable and runs molten (emissive ember, slow
 * breathing pulse); every level below is colder, down to the deep-frozen
 * glacial base. Write particles fall as hot sparks and freeze mid-air —
 * ember → plasma → ice by altitude — which is exactly what flush and
 * compaction do to data.
 */

const SLABS = [
  {
    size: [1.5, 0.14, 1.5],
    y: 1.55,
    edge: "#ffc27d",
    edgeOpacity: 0.95,
    body: "#2f140a",
    emissive: "#ff6b3d",
    emissiveIntensity: 0.5,
  },
  {
    size: [2.0, 0.16, 2.0],
    y: 0.85,
    edge: "#ff8a5c",
    edgeOpacity: 0.65,
    body: "#1d1210",
    emissive: "#b4552d",
    emissiveIntensity: 0.16,
  },
  {
    size: [2.55, 0.18, 2.55],
    y: 0.1,
    edge: "#c084fc",
    edgeOpacity: 0.42,
    body: "#131322",
    emissive: "#4c2a6e",
    emissiveIntensity: 0.12,
  },
  {
    size: [3.15, 0.2, 3.15],
    y: -0.7,
    edge: "#7dd3fc",
    edgeOpacity: 0.38,
    body: "#0d1a2c",
    emissive: "#155e82",
    emissiveIntensity: 0.09,
  },
  {
    size: [3.8, 0.22, 3.8],
    y: -1.55,
    edge: "#67b8e3",
    edgeOpacity: 0.28,
    body: "#091524",
    emissive: "#7dd3fc",
    emissiveIntensity: 0.05,
  },
] as const;

const FALL_SPEED = 0.45;
const COLUMN_TOP = 2.4;
const COLUMN_BOTTOM = -2.1;

function StrataStack({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const moltenMaterial = useRef<THREE.MeshStandardMaterial>(null);
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

  useFrame((state, delta) => {
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
    // The memtable breathes: a slow molten pulse, never strobing
    if (moltenMaterial.current) {
      moltenMaterial.current.emissiveIntensity =
        0.5 + Math.sin(state.clock.elapsedTime * 1.4) * 0.18;
    }
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
            ref={i === 0 ? moltenMaterial : undefined}
            color={slab.body}
            emissive={slab.emissive}
            emissiveIntensity={slab.emissiveIntensity}
            metalness={0.45}
            roughness={0.42}
            transparent
            opacity={0.94}
          />
          <Edges color={slab.edge} opacity={slab.edgeOpacity} transparent />
        </mesh>
      ))}
      <FlushParticles animate={animate} />
    </group>
  );
}

// Altitude → temperature. t=1 at the molten top, t=0 at the frozen floor.
const C_FLAME = new THREE.Color("#ffb454");
const C_EMBER = new THREE.Color("#ff6b3d");
const C_PLASMA = new THREE.Color("#c084fc");
const C_ICE = new THREE.Color("#7dd3fc");

function temperatureColor(t: number, out: THREE.Color) {
  if (t > 0.55) out.lerpColors(C_EMBER, C_FLAME, (t - 0.55) / 0.45);
  else if (t > 0.25) out.lerpColors(C_PLASMA, C_EMBER, (t - 0.25) / 0.3);
  else out.lerpColors(C_ICE, C_PLASMA, t / 0.25);
  return out;
}

function FlushParticles({
  animate,
  count = 280,
}: {
  animate: boolean;
  count?: number;
}) {
  const points = useRef<THREE.Points>(null);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.7;
      const y = COLUMN_BOTTOM + Math.random() * (COLUMN_TOP - COLUMN_BOTTOM);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      temperatureColor(
        (y - COLUMN_BOTTOM) / (COLUMN_TOP - COLUMN_BOTTOM),
        c,
      ).toArray(colors, i * 3);
      speeds[i] = 0.4 + Math.random() * 0.8;
    }
    return { positions, colors, speeds };
  }, [count]);

  useFrame((_, delta) => {
    if (!animate || !points.current) return;
    const dt = Math.min(delta, 0.05);
    const geometry = points.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const col = colorAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      let y = pos[i * 3 + 1] - FALL_SPEED * speeds[i] * dt;
      if (y < COLUMN_BOTTOM) y = COLUMN_TOP;
      pos[i * 3 + 1] = y;
      // Sparks cool as they fall: ember → plasma → ice
      temperatureColor(
        (y - COLUMN_BOTTOM) / (COLUMN_TOP - COLUMN_BOTTOM),
        tmpColor,
      ).toArray(col, i * 3);
    }
    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
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
      camera={{ position: [0, 0.5, 7.3], fov: 40 }}
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
      <ambientLight intensity={0.5} />
      {/* Lit like the system it is: heat from above, cold from below */}
      <pointLight position={[3.5, 5, 4]} intensity={42} color="#ff7a45" />
      <pointLight position={[-5, -3, 3]} intensity={26} color="#3f7fb8" />
      <StrataStack animate={animate} />
    </Canvas>
  );
}
