"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { ProductModelType } from "@/lib/products";

/* ---------- soft studio environment (no network assets) ---------- */
function StudioEnv() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ---------- materials ---------- */
const amberGlass = {
  color: "#7a5a33",
  roughness: 0.12,
  metalness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.06,
  envMapIntensity: 1.4,
  transparent: true,
  opacity: 0.97
};

const paleGlass = {
  color: "#cfe3c2",
  roughness: 0.15,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.3,
  transparent: true,
  opacity: 0.88
};

const darkGlass = {
  color: "#241812",
  roughness: 0.06,
  metalness: 0.25,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  envMapIntensity: 1.5,
  transparent: true,
  opacity: 0.92
};

const gold = {
  color: "#c9ae7e",
  roughness: 0.22,
  metalness: 0.9,
  envMapIntensity: 1.3
};

const wood = { color: "#4a3222", roughness: 0.62, metalness: 0 };

const cream = { color: "#f3ecdf", roughness: 0.4, metalness: 0.02 };

const noir = { color: "#17100b", roughness: 0.75, metalness: 0 };

/* ---------- procedural product models ---------- */
function Bottle() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.56, 0.66, 1.5, 48]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
      <mesh position={[0, 0.86, 0]} scale={[1.02, 0.34, 1.02]}>
        <sphereGeometry args={[0.56, 48, 32]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.34, 40]} />
        <meshPhysicalMaterial {...wood} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.14, 40]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
    </group>
  );
}

function Pump() {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.48, 0.56, 1.7, 48]} />
        <meshPhysicalMaterial {...paleGlass} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 40]} />
        <meshPhysicalMaterial {...paleGlass} />
      </mesh>
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.3, 32]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
      <mesh position={[0, 1.52, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.42, 16]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
      <mesh position={[0.26, 1.38, 0]}>
        <boxGeometry args={[0.36, 0.12, 0.12]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
    </group>
  );
}

function Dropper() {
  return (
    <group>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.44, 0.5, 1.2, 40]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
      <mesh position={[0, 0.56, 0]} scale={[1, 0.3, 1]}>
        <sphereGeometry args={[0.44, 40, 24]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.4, 32]} />
        <meshPhysicalMaterial {...wood} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.5, 16]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.11, 16, 12]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
    </group>
  );
}

function Jar() {
  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.78, 0.72, 1.1, 48]} />
        <meshPhysicalMaterial {...cream} />
      </mesh>
      <mesh position={[0.06, 0.68, 0]} rotation={[0.08, 0, -0.06]}>
        <cylinderGeometry args={[0.5, 0.5, 0.24, 48]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
      <mesh position={[0, 0.48, 0]} scale={[1, 0.22, 1]}>
        <sphereGeometry args={[0.72, 40, 24]} />
        <meshPhysicalMaterial color="#faf5ec" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Vial() {
  return (
    <group>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.15, 8]} />
        <meshPhysicalMaterial {...darkGlass} />
      </mesh>
      <mesh position={[0, 0.56, 0]} scale={[1, 0.26, 1]}>
        <sphereGeometry args={[0.4, 24, 16]} />
        <meshPhysicalMaterial {...darkGlass} />
      </mesh>
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.34, 24]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
      <mesh position={[0, 1.16, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 12]} />
        <meshPhysicalMaterial {...darkGlass} />
      </mesh>
      <mesh position={[0, 1.42, 0]}>
        <sphereGeometry args={[0.09, 12, 10]} />
        <meshPhysicalMaterial {...darkGlass} />
      </mesh>
    </group>
  );
}

function Slim() {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 2.05, 40]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
      <mesh position={[0, 1.08, 0]} scale={[1, 0.22, 1]}>
        <sphereGeometry args={[0.32, 40, 24]} />
        <meshPhysicalMaterial {...amberGlass} />
      </mesh>
      <mesh position={[0, 1.52, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.5, 32]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
      <mesh position={[0, 1.82, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.22, 16]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
    </group>
  );
}

function Bar() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]} rotation={[0.06, 0.4, 0]}>
        <boxGeometry args={[1.15, 0.42, 0.72]} />
        <meshPhysicalMaterial {...noir} />
      </mesh>
      <mesh position={[0, 0.32, 0]} rotation={[0.06, 0.4, 0]}>
        <boxGeometry args={[1.05, 0.02, 0.62]} />
        <meshPhysicalMaterial {...gold} />
      </mesh>
    </group>
  );
}

const MODELS: Record<ProductModelType, () => JSX.Element> = {
  bottle: Bottle,
  pump: Pump,
  dropper: Dropper,
  jar: Jar,
  vial: Vial,
  slim: Slim,
  bar: Bar
};

/* ---------- pointer parallax ---------- */
function Parallax({
  children,
  intensity = 1
}: {
  children: React.ReactNode;
  intensity?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, px * 0.22 * intensity, delta * 2.2);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -py * 0.12 * intensity, delta * 2.2);
    g.position.x = THREE.MathUtils.lerp(g.position.x, px * 0.18 * intensity, delta * 2);
    g.position.y = THREE.MathUtils.lerp(g.position.y, -py * 0.1 * intensity, delta * 2);
  });
  return <group ref={ref}>{children}</group>;
}

/* ---------- rotation: idle spin and/or scroll-driven 3D orbit ---------- */
function Spin({
  children,
  active,
  speed = 0.25,
  target
}: {
  children: React.ReactNode;
  active?: boolean;
  speed?: number;
  /** scroll-linked rotation target (true in-world 3D orbit) */
  target?: () => number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    if (target) {
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, target(), Math.min(1, delta * 3));
    } else if (active) {
      g.rotation.y += delta * speed;
    }
  });
  return <group ref={ref}>{children}</group>;
}

/* ---------- main scene ---------- */
export default function ProductScene({
  model,
  sparkles = false,
  autoRotate = false,
  interactive = true,
  float = true,
  lowPower = false,
  staticShadow = false,
  dprMax = 1.5,
  getRotate,
  className,
  cameraZ = 4.4,
  onReady
}: {
  model: ProductModelType;
  sparkles?: boolean;
  autoRotate?: boolean;
  interactive?: boolean;
  float?: boolean;
  lowPower?: boolean;
  /** render the contact shadow once (static scene) instead of every frame */
  staticShadow?: boolean;
  dprMax?: number;
  getRotate?: () => number;
  className?: string;
  cameraZ?: number;
  onReady?: () => void;
}) {
  const Model = MODELS[model];
  const parallaxIntensity = useMemo(() => (interactive ? 1 : 0.35), [interactive]);
  const useFloat = float && !lowPower;

  /* pause rendering entirely when the canvas scrolls off-screen */
  const wrapRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        frameloop={onScreen ? "always" : "never"}
        camera={{ position: [0, 0.35, cameraZ], fov: 36 }}
        dpr={lowPower ? [1, 1.15] : [1, dprMax]}
        gl={{
          antialias: !lowPower,
          alpha: true,
          powerPreference: lowPower ? "default" : "high-performance"
        }}
        onCreated={onReady}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <StudioEnv />
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 6, 3]} intensity={1.35} color="#fff1dc" />
          <directionalLight position={[-5, 2, -2]} intensity={0.5} color="#d8b98a" />
          <pointLight position={[-3, -1, 3]} intensity={0.35} color="#f0d9b0" />

          <Parallax intensity={parallaxIntensity}>
            <Spin
              active={autoRotate || (interactive && !getRotate)}
              speed={autoRotate ? 0.5 : 0.12}
              target={getRotate}
            >
              {useFloat ? (
                <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
                  <group position={[0, -0.15, 0]} scale={1.05}>
                    <Model />
                  </group>
                </Float>
              ) : (
                <group position={[0, -0.15, 0]} scale={1.05}>
                  <Model />
                </group>
              )}
            </Spin>
            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.5}
              scale={11}
              blur={2.6}
              far={3.2}
              resolution={lowPower ? 128 : 256}
              frames={staticShadow ? 1 : Infinity}
              color="#241812"
            />
          </Parallax>

          {sparkles && (
            <Sparkles
              count={lowPower ? 16 : 48}
              scale={[9, 5.5, 9]}
              size={lowPower ? 1.4 : 2.2}
              speed={0.25}
              opacity={0.45}
              color="#d9b98c"
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
