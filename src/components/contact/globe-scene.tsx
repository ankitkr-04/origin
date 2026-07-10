"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * A geodesic earth with THERMAL physics: the dot-sphere stays glacial
 * (data at rest is cold), the network arcs burn ember (data in flight is
 * hot), node endpoints pulse warm on arrival, and a faint aurora ring —
 * teal shading into plasma — circles the pole.
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

/** Unique vertices of a subdivided icosahedron — hexagonally packed dots. */
function useGeodesicDots(detail: number) {
  return useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(RADIUS, detail);
    const raw = geometry.getAttribute("position").array as Float32Array;
    geometry.dispose();
    const seen = new Set<string>();
    const unique: number[] = [];
    for (let i = 0; i < raw.length; i += 3) {
      const key = `${raw[i].toFixed(3)},${raw[i + 1].toFixed(3)},${raw[i + 2].toFixed(3)}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(raw[i], raw[i + 1], raw[i + 2]);
      }
    }
    return new Float32Array(unique);
  }, [detail]);
}

/** Arc between two surface points, lifted along the normal at its midpoint. */
function arcBetween(a: THREE.Vector3, b: THREE.Vector3): Float32Array {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const lift = 1 + a.distanceTo(b) / (2 * RADIUS);
  mid.setLength(RADIUS * lift);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const points = curve.getPoints(48);
  const array = new Float32Array(points.length * 3);
  points.forEach((p, i) => {
    p.toArray(array, i * 3);
  });
  return array;
}

function randomSurfacePoint(): THREE.Vector3 {
  return new THREE.Vector3()
    .randomDirection()
    .setLength(RADIUS)
    .multiply(new THREE.Vector3(1, 0.72, 1)) // bias toward inhabited latitudes
    .setLength(RADIUS);
}

function Globe({ animate, dotCount }: { animate: boolean; dotCount: number }) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(0);

  const dots = useGeodesicDots(dotCount);
  const aurora = useAuroraRing();

  const { nodePositions, arcs } = useMemo(() => {
    const endpoints: THREE.Vector3[] = [];
    for (let i = 0; i < 12; i++) endpoints.push(randomSurfacePoint());
    const nodePositions = new Float32Array(endpoints.length * 3);
    endpoints.forEach((p, i) => {
      p.toArray(nodePositions, i * 3);
    });
    const arcs: Float32Array[] = [];
    for (let i = 0; i < endpoints.length - 1; i += 2) {
      arcs.push(arcBetween(endpoints[i], endpoints[i + 1]));
    }
    return { nodePositions, arcs };
  }, []);

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
    if (nodesRef.current) {
      const material = nodesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.65 + Math.sin(state.clock.elapsedTime * 2.2) * 0.3;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0, -0.15]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dots, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#7dd3fc"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.085}
          color="#ffb454"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {arcs.map((arc) => (
        <line key={arc[0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[arc, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#ff6b3d"
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </line>
      ))}

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
