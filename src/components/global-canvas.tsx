"use client";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function GlobalCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        mixBlendMode: "screen",
      }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <View.Port />
    </Canvas>
  );
}
