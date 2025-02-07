import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function GalaxyField() {
  const points = useRef();
  const { mouse, viewport } = useThree();
  const count = window.innerWidth < 768 ? 2000 : 4000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const radius = 5;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const spiralRadius = (Math.random() + 0.5) * radius;
      const heightVar = Math.cos(angle * 3) * (Math.random() - 0.5) * 2;

      pos[i * 3] = Math.cos(angle) * spiralRadius;
      pos[i * 3 + 1] = heightVar;
      pos[i * 3 + 2] = Math.sin(angle) * spiralRadius;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.z =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;

      // Mouse interaction
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      points.current.position.x += (x - points.current.position.x) * 0.05;
      points.current.position.y += (y - points.current.position.y) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Points ref={points} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </Float>
  );
}

function FloatingRings() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group}>
      {[1, 2, 3].map((ring, i) => (
        <mesh key={i} position={[0, i * 0.5, 0]}>
          <torusGeometry args={[ring * 1.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#4c1d95"
            emissive="#4c1d95"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function PlanetaryNebula() {
  const group = useRef();
  const particleCount = 2000;
  const ringCount = 5;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    
    // Core nebula particles
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.pow(Math.random(), 2) * 4;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      group.current.rotation.y = time * 0.1;
      group.current.rotation.z = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Central particle system */}
      <Points positions={positions}>
        <PointMaterial
          vertexColors
          size={0.03}
          sizeAttenuation={true}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          colors={colors}
        />
      </Points>

      {/* Glowing rings */}
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[(i + 1) * 0.8, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#4c1d95"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}

      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ff69b4"
          emissive="#ff69b4"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: window.innerWidth < 768 ? 75 : 60,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: false,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 15]} />

        <GalaxyField />
        <FloatingRings />
        <PlanetaryNebula />

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />

        <PerspectiveCamera makeDefault />
      </Canvas>
    </div>
  );
}
