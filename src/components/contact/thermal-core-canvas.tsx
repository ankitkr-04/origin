"use client";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { REDUCED_MOTION, useMediaQuery } from "@/hooks/use-media-query";

const ThermalCoreScene = dynamic(
  () => import("@/components/contact/thermal-core-scene"),
  {
    ssr: false,
  },
);

export function ThermalCoreCanvas() {
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION);

  if (prefersReducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center opacity-30 pointer-events-none">
        <div className="h-48 w-48 rounded-full border border-ice/20 shadow-[0_0_60px_rgba(125,211,252,0.1)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80 md:opacity-100 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <ThermalCoreScene />
      </Canvas>
    </div>
  );
}
