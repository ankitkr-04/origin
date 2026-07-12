"use client";
import { Environment, Float, Icosahedron, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

export default function ThermalCoreScene() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Use useMemo for geometry setup to prevent recreation
  const torusArgs1 = useMemo<[number, number, number, number]>(
    () => [2.6, 0.006, 16, 100],
    [],
  );
  const torusArgs2 = useMemo<[number, number, number, number]>(
    () => [2.9, 0.008, 16, 100],
    [],
  );

  useFrame((state, delta) => {
    // Skip heavy calculations if delta is too high (lagging)
    if (delta > 0.05) return;

    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      // Slow, deliberate rotation
      coreRef.current.rotation.y = t * 0.1;
      coreRef.current.rotation.x = t * 0.15;
    }

    if (ringRef.current) {
      // Counter-rotation for the rings
      ringRef.current.rotation.z = t * 0.05;
      ringRef.current.rotation.y = t * 0.08;
    }
  });

  // Theme colors from globals.css
  const colorIce = "#7dd3fc";
  const colorEmber = "#ff6b3d";
  const colorPlasma = "#c084fc";
  const colorVoid = "#04070d";

  return (
    <>
      <ambientLight intensity={0.2} />

      {/* Directional lights to simulate thermal lighting (ice on left, ember on right) */}
      <directionalLight position={[-4, 2, 4]} intensity={2} color={colorIce} />
      <directionalLight
        position={[4, -2, -4]}
        intensity={3}
        color={colorEmber}
      />

      {/* Core internal glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        color={colorPlasma}
        distance={8}
      />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={ringRef}>
          {/* Subtle orbital rings */}
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <torusGeometry args={torusArgs1} />
            <meshBasicMaterial color={colorIce} transparent opacity={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={torusArgs2} />
            <meshBasicMaterial color={colorEmber} transparent opacity={0.3} />
          </mesh>
        </group>

        {/* The Core: An Icosahedron with premium metallic/glassy material */}
        <Icosahedron ref={coreRef} args={[1.5, 0]}>
          <meshPhysicalMaterial
            color={colorVoid}
            metalness={0.9}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2.5}
            transparent={true}
            opacity={0.9}
          />
        </Icosahedron>

        {/* Inner diffuse sphere for plasma glow */}
        <Sphere args={[1.3, 24, 24]}>
          <meshBasicMaterial color={colorPlasma} transparent opacity={0.15} />
        </Sphere>
      </Float>

      {/* Environment map for premium reflections */}
      <Environment preset="city" />
    </>
  );
}
