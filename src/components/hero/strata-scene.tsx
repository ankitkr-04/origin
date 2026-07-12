// src/components/hero/strata-scene.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// THE SEAM — same 5 stops as the CSS token, reproduced as vertex color.
// t=0 is cold/resting (ice), t=1 is hot/attention (ember) — matches the
// thermal-rail convention (ember at top, ice at bottom) used elsewhere.
const SEAM_STOPS: [number, THREE.Color][] = [
  [0, new THREE.Color("#7dd3fc")],
  [0.3, new THREE.Color("#8b9cf9")],
  [0.5, new THREE.Color("#c084fc")],
  [0.7, new THREE.Color("#ff5f8f")],
  [1, new THREE.Color("#ff6b3d")],
];

function seamColorAt(t: number, out: THREE.Color) {
  const c = THREE.MathUtils.clamp(t, 0, 1);
  for (let i = 0; i < SEAM_STOPS.length - 1; i++) {
    const [t0, c0] = SEAM_STOPS[i];
    const [t1, c1] = SEAM_STOPS[i + 1];
    if (c >= t0 && c <= t1) {
      out.copy(c0).lerp(c1, (c - t0) / (t1 - t0));
      return out;
    }
  }
  return out.copy(SEAM_STOPS[SEAM_STOPS.length - 1][1]);
}

// p=2,q=3 torus-knot radius — shared by the mesh and the particle path
// so the current rides the ribbon's actual centerline.
const RADIUS = 1.3;
const P = 2;
const Q = 3;

function SeamRibbon({
  animate,
  lowDetail,
}: {
  animate: boolean;
  lowDetail: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const flare = useRef<THREE.PointLight>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  const geometry = useMemo(() => {
    const tubularSegments = lowDetail ? 140 : 240;
    const radialSegments = lowDetail ? 6 : 8; // deliberately low — gem-cut, not a smooth pipe
    const geo = new THREE.TorusKnotGeometry(
      RADIUS,
      0.34,
      tubularSegments,
      radialSegments,
      P,
      Q,
    );
    geo.computeBoundingBox();
    const bbox = geo.boundingBox || new THREE.Box3();
    const pos = geo.getAttribute("position");
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const t = (pos.getY(i) - bbox.min.y) / (bbox.max.y - bbox.min.y);
      seamColorAt(t, c);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [lowDetail]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.current.x * 0.3,
        animate ? 0.045 : 0.02,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0.1 + pointer.current.y * -0.14,
        animate ? 0.045 : 0.02,
      );
    }
    if (knot.current && animate) {
      knot.current.rotation.z += dt * 0.12;
      knot.current.rotation.y += dt * 0.05;
    }
    if (flare.current && animate) {
      flare.current.position.x = THREE.MathUtils.lerp(
        flare.current.position.x,
        pointer.current.x * 2.4,
        0.08,
      );
      flare.current.position.y = THREE.MathUtils.lerp(
        flare.current.position.y,
        -pointer.current.y * 1.8,
        0.08,
      );
    }
  });

  return (
    <group ref={group} position={[0.6, -0.1, 0]}>
      <mesh ref={knot} geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          color="#ffffff"
          emissive="#c084fc"
          emissiveIntensity={0.2}
          metalness={0.6}
          roughness={0.26}
        />
      </mesh>
      <pointLight
        ref={flare}
        position={[0, 0, 2.5]}
        intensity={9}
        color="#ffb454"
      />
      <SeamCurrent animate={animate} lowDetail={lowDetail} />
    </group>
  );
}

function SeamCurrent({
  animate,
  lowDetail,
}: {
  animate: boolean;
  lowDetail: boolean;
}) {
  const points = useRef<THREE.Points>(null);
  const count = lowDetail ? 70 : 150;
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const { positions, colors, seeds, jitters } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 2); // [u, speed]
    const jitters = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const u = (i / count) * Math.PI * 2 * P;
      seeds[i * 2] = u;
      seeds[i * 2 + 1] = 0.18 + Math.random() * 0.22;
      jitters[i * 3] = (Math.random() - 0.5) * 0.24;
      jitters[i * 3 + 1] = (Math.random() - 0.5) * 0.24;
      jitters[i * 3 + 2] = (Math.random() - 0.5) * 0.24;

      const cu = Math.cos(u);
      const su = Math.sin(u);
      const quOverP = (Q / P) * u;
      const cs = Math.cos(quOverP);
      const x = RADIUS * (2 + cs) * 0.5 * cu + jitters[i * 3];
      const y = RADIUS * (2 + cs) * su * 0.5 + jitters[i * 3 + 1];
      const z = RADIUS * Math.sin(quOverP) * 0.5 + jitters[i * 3 + 2];
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t = (y + RADIUS * 1.5) / (RADIUS * 3);
      seamColorAt(t, c);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, seeds, jitters };
  }, [count]);

  useFrame((_state, delta) => {
    if (!animate || !points.current) return;
    const geo = points.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geo.getAttribute("color") as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const col = colAttr.array as Float32Array;
    const dt = Math.min(delta, 0.05);

    for (let i = 0; i < count; i++) {
      seeds[i * 2] += seeds[i * 2 + 1] * dt;
      const u = seeds[i * 2];
      const cu = Math.cos(u);
      const su = Math.sin(u);
      const quOverP = (Q / P) * u;
      const cs = Math.cos(quOverP);
      const x = RADIUS * (2 + cs) * 0.5 * cu + jitters[i * 3];
      const y = RADIUS * (2 + cs) * su * 0.5 + jitters[i * 3 + 1];
      const z = RADIUS * Math.sin(quOverP) * 0.5 + jitters[i * 3 + 2];
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const t = (y + RADIUS * 1.5) / (RADIUS * 3);
      seamColorAt(t, tmpColor);
      col[i * 3] = tmpColor.r;
      col[i * 3 + 1] = tmpColor.g;
      col[i * 3 + 2] = tmpColor.b;
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export interface StrataSceneProps {
  animate: boolean;
  maxDpr: number;
  lowDetail: boolean;
}

import { WebGLContextManager } from "@/components/webgl-context-manager";

export default function StrataScene({
  animate,
  maxDpr,
  lowDetail,
}: StrataSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.25, 6.4], fov: 32 }}
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
      <WebGLContextManager />
      <ambientLight intensity={0.45} />
      <pointLight position={[4.5, 5, 5.5]} intensity={30} color="#ffb454" />
      <pointLight position={[-4, -2, 4]} intensity={18} color="#7dd3fc" />
      <pointLight position={[0, 3, 2]} intensity={10} color="#c084fc" />
      <SeamRibbon animate={animate} lowDetail={lowDetail} />
    </Canvas>
  );
}
