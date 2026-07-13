"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { REDUCED_MOTION, useMediaQuery } from "@/hooks/use-media-query";

export default function GlassShardsScene({
  isVisible = true,
}: {
  isVisible?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery(REDUCED_MOTION);

  const isVisibleRef = useRef(isVisible);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef(performance.now());
  const lastVisibleTimeRef = useRef(performance.now());
  const animateRef = useRef<((time: number) => void) | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isVisibleRef.current = isVisible;
    if (isVisible) {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (isPausedRef.current && animateRef.current) {
        isPausedRef.current = false;
        lastTimeRef.current = performance.now();
        lastVisibleTimeRef.current = performance.now();
        requestAnimationFrame(animateRef.current);
      }
    } else {
      if (!pauseTimeoutRef.current) {
        pauseTimeoutRef.current = setTimeout(() => {
          isPausedRef.current = true;
          pauseTimeoutRef.current = null;
        }, 1400);
      }
    }
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Config - Fire and Ice Theme
    const CONFIG = {
      shardCount: 20,
      innerRadius: 3.2,
      outerRadius: 8,
      coreRadius: 0.22,
      // Fire and Ice packets (orange, red, cyan, blue)
      emberColors: [0xff7a3d, 0xff9c4a, 0x00d4ff, 0x80efff],
      bloom: { strength: 1.15, radius: 0.55, threshold: 0.18 },
      spawnMin: 1.7,
      spawnMax: 3.6,
      travelMin: 1.1,
      travelMax: 2.0,
    };

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    // We don't want a hard background color so it overlays properly, but we can keep fog
    scene.fog = new THREE.FogExp2(0x050509, 0.025);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const REST_Z = 12;
    const INTRO_Z = 20;
    const REST_Y = 0.6;
    camera.position.set(0, REST_Y, reduceMotion ? REST_Z : INTRO_Z);
    camera.lookAt(0, 0, 0);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04,
    ).texture;

    // Glass material with "ice" tint (cyan/blue base instead of neutral dark)
    function makeGlassMaterial(hueShift: number) {
      const color = new THREE.Color(0x051a24); // Icy dark base
      color.offsetHSL(hueShift, 0, 0);
      return new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0,
        roughness: 0.5,
        transmission: 1.0,
        thickness: 1.6,
        ior: 1.42,
        clearcoat: 0.5,
        clearcoatRoughness: 0.25,
        attenuationColor: new THREE.Color(0x18213c),
        attenuationDistance: 2.4,
        envMapIntensity: 1.1,
        flatShading: true,
      });
    }
    const glassMaterials = [
      makeGlassMaterial(0),
      makeGlassMaterial(0.015),
      makeGlassMaterial(-0.02),
    ];

    function createShardGeometry() {
      const points = [];
      const count = 6 + Math.floor(Math.random() * 4);
      const halfHeight = THREE.MathUtils.randFloat(0.35, 0.9);
      const halfWidth = THREE.MathUtils.randFloat(0.1, 0.26);

      for (let i = 0; i < count; i++) {
        points.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * halfWidth * 2,
            (Math.random() - 0.5) * halfHeight * 2,
            (Math.random() - 0.5) * halfWidth * 2,
          ),
        );
      }
      points.push(new THREE.Vector3(0, halfHeight, 0));
      points.push(new THREE.Vector3(0, -halfHeight, 0));

      return new ConvexGeometry(points);
    }

    const shardGroup = new THREE.Group();
    scene.add(shardGroup);
    const shards: THREE.Mesh[] = [];

    for (let i = 0; i < CONFIG.shardCount; i++) {
      const geometry = createShardGeometry();
      const material = glassMaterials[i % glassMaterials.length];
      const mesh = new THREE.Mesh(geometry, material);

      const radius = THREE.MathUtils.randFloat(
        CONFIG.innerRadius,
        CONFIG.outerRadius,
      );
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.55,
        radius * Math.sin(phi) * Math.sin(theta),
      );

      const depth =
        1 -
        (radius - CONFIG.innerRadius) /
          (CONFIG.outerRadius - CONFIG.innerRadius);
      const scale =
        THREE.MathUtils.lerp(0.4, 1.1, depth) *
        THREE.MathUtils.randFloat(0.8, 1.2);
      mesh.scale.setScalar(scale);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );

      mesh.userData.baseScale = scale;
      mesh.userData.basePos = mesh.position.clone();
      mesh.userData.spin = new THREE.Vector3(
        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12,
        (Math.random() - 0.5) * 0.12,
      );
      mesh.userData.bobSpeed = 0.25 + Math.random() * 0.4;
      mesh.userData.bobPhase = Math.random() * Math.PI * 2;
      mesh.userData.bobAmp = 0.1 + Math.random() * 0.22;
      mesh.userData.pulse = 0;

      shardGroup.add(mesh);
      shards.push(mesh);
    }

    // Fire Core
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(CONFIG.coreRadius, 20, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff2da }),
    );
    scene.add(core);

    const coreLight = new THREE.PointLight(0xff8a3d, 9, 9, 2);
    scene.add(coreLight);

    const packets: {
      mesh: THREE.Mesh;
      light: THREE.PointLight;
      curve: THREE.QuadraticBezierCurve3;
      color: THREE.Color;
      target: THREE.Mesh;
      duration: number;
      t: number;
    }[] = [];
    const packetGeometry = new THREE.SphereGeometry(0.055, 10, 8);
    const impactLights: {
      light: THREE.PointLight;
      life: number;
      duration: number;
    }[] = [];

    function spawnPacket() {
      const targetShard = shards[Math.floor(Math.random() * shards.length)];
      const start = new THREE.Vector3(0, 0, 0);
      const end = targetShard.position.clone();

      const mid = start.clone().lerp(end, 0.5);
      const offset = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
      ).normalize();
      mid.addScaledVector(offset, end.length() * (0.18 + Math.random() * 0.14));

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const color = new THREE.Color(
        CONFIG.emberColors[
          Math.floor(Math.random() * CONFIG.emberColors.length)
        ],
      );

      const mesh = new THREE.Mesh(
        packetGeometry,
        new THREE.MeshBasicMaterial({ color }),
      );
      const light = new THREE.PointLight(color, 5, 5.5, 2);
      mesh.add(light);
      scene.add(mesh);

      packets.push({
        mesh,
        light,
        curve,
        color,
        target: targetShard,
        duration: THREE.MathUtils.randFloat(CONFIG.travelMin, CONFIG.travelMax),
        t: 0,
      });
    }

    function impact(shard: THREE.Mesh, color: THREE.Color) {
      const light = new THREE.PointLight(color, 6, 6, 2);
      light.position.copy(shard.position);
      scene.add(light);
      impactLights.push({ light, life: 0, duration: 0.55 });
      shard.userData.pulse = 1;
    }

    function updatePackets(dt: number) {
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += dt / p.duration;

        if (p.t >= 1) {
          impact(p.target, p.color);
          scene.remove(p.mesh);
          (p.mesh.material as THREE.Material).dispose();
          packets.splice(i, 1);
          continue;
        }

        p.mesh.position.copy(
          p.curve.getPoint(THREE.MathUtils.clamp(p.t, 0, 1)),
        );
        const fadeIn = THREE.MathUtils.smoothstep(p.t, 0, 0.06);
        const fadeOut = 1 - THREE.MathUtils.smoothstep(p.t, 0.9, 1);
        p.light.intensity = 5 * fadeIn * fadeOut;
      }

      for (let i = impactLights.length - 1; i >= 0; i--) {
        const il = impactLights[i];
        il.life += dt;
        const k = il.life / il.duration;
        il.light.intensity = 6 * (1 - k);
        if (k >= 1) {
          scene.remove(il.light);
          impactLights.splice(i, 1);
        }
      }
    }

    let spawnTimer = 0;
    let nextSpawn = 1.2;
    function updateSpawner(dt: number) {
      spawnTimer += dt;
      if (spawnTimer >= nextSpawn) {
        spawnTimer = 0;
        nextSpawn = THREE.MathUtils.randFloat(CONFIG.spawnMin, CONFIG.spawnMax);
        spawnPacket();
      }
    }

    function updateShards(dt: number, elapsed: number) {
      const motionScale = reduceMotion ? 0.25 : 1;
      for (const mesh of shards) {
        const u = mesh.userData;
        mesh.rotation.x += u.spin.x * dt * motionScale;
        mesh.rotation.y += u.spin.y * dt * motionScale;
        mesh.rotation.z += u.spin.z * dt * motionScale;
        mesh.position.y =
          u.basePos.y +
          Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp * motionScale;

        if (u.pulse > 0.001) {
          u.pulse *= 0.002 ** dt;
          mesh.scale.setScalar(u.baseScale * (1 + u.pulse * 0.15));
        } else if (u.pulse !== 0) {
          u.pulse = 0;
          mesh.scale.setScalar(u.baseScale);
        }
      }
    }

    const pointerTarget = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      CONFIG.bloom.strength,
      CONFIG.bloom.radius,
      CONFIG.bloom.threshold,
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    });
    resizeObserver.observe(container);

    const INTRO_DURATION = reduceMotion ? 0.001 : 2.4;
    let animationFrameId: number;

    // For smooth reveal
    let revealed = false;

    function animate(time: number) {
      if (!isVisibleRef.current && isPausedRef.current) {
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const dt = Math.min(delta, 0.05);
      const elapsed = time / 1000;
      const introElapsed = (time - lastVisibleTimeRef.current) / 1000;

      updateSpawner(dt);
      updatePackets(dt);
      updateShards(dt, elapsed);

      const corePulse = 1 + Math.sin(elapsed * 1.6) * 0.05;
      core.scale.setScalar(corePulse);
      coreLight.intensity = 9 + Math.sin(elapsed * 1.6) * 1.6;

      const introT = THREE.MathUtils.clamp(introElapsed / INTRO_DURATION, 0, 1);
      const eased = 1 - (1 - introT) ** 3;
      const parallaxGate = reduceMotion ? 0 : 1;

      pointer.x += (pointerTarget.x - pointer.x) * 0.04;
      pointer.y += (pointerTarget.y - pointer.y) * 0.04;

      let xOffset = 0;
      if (window.innerWidth >= 768) {
        // Shift camera left so the 3D origin (x=0) appears on the right side of the screen
        // Center of the right side is ~67%. Offset is 17% of width = approx 1.56 * aspect.
        xOffset = -1.56 * camera.aspect;
      }

      camera.position.set(
        pointer.x * 1.1 * eased * parallaxGate + xOffset,
        REST_Y - pointer.y * 0.7 * eased * parallaxGate,
        THREE.MathUtils.lerp(INTRO_Z, REST_Z, eased),
      );
      camera.lookAt(xOffset, 0, 0);
      shardGroup.rotation.y = pointer.x * 0.05 * eased * parallaxGate;

      composer.render();

      if (!revealed && canvasRef.current) {
        revealed = true;
        canvasRef.current.style.opacity = "1";
      }
    }

    animateRef.current = animate;

    if (isVisibleRef.current) {
      isPausedRef.current = false;
      lastTimeRef.current = performance.now();
      lastVisibleTimeRef.current = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    } else {
      isPausedRef.current = true;
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);

      // Traverse and dispose meshes
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              for (const m of object.material) m.dispose();
            } else {
              object.material.dispose();
            }
          }
        }
      });

      // Explicitly dispose shared/remaining objects
      for (const mat of glassMaterials) {
        mat.dispose();
      }
      packetGeometry.dispose();

      renderer.dispose();
      pmremGenerator.dispose();
      scene.clear();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full transition-opacity duration-[1400ms] ease-out opacity-0"
      />
    </div>
  );
}
