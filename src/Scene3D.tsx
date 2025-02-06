import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera,
  Instance,
  Instances,
  Trail,
  Text3D
} from '@react-three/drei';
import * as THREE from 'three';
import { Preload } from '@react-three/drei';
// Custom shader for glow effect
const glowShader = {
  uniforms: {
    color: { value: new THREE.Color('#8b5cf6') },
    glowColor: { value: new THREE.Color('#4c1d95') },
    time: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform vec3 glowColor;
    uniform float time;
    varying vec2 vUv;
    void main() {
      float strength = distance(vUv, vec2(0.5));
      vec3 glow = mix(color, glowColor, strength);
      gl_FragColor = vec4(glow, 1.0 - strength);
    }
  `
};

function ParticleGalaxy() {
  const count = 1000;
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = Math.random() * 5 + 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8b5cf6"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DoubleHelix() {
  const count = 30;
  const radius = 2;
  const points1 = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 4;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        (i / count) * 10 - 5,
        Math.sin(angle) * radius
      );
    });
  }, []);

  const points2 = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 4 + Math.PI;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        (i / count) * 10 - 5,
        Math.sin(angle) * radius
      );
    });
  }, []);

  return (
    <group>
      <Instances>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhongMaterial color="#8b5cf6" />
        {points1.map((point, i) => (
          <Instance key={i} position={point} />
        ))}
        {points2.map((point, i) => (
          <Instance key={`b${i}`} position={point} />
        ))}
      </Instances>
      {points1.map((point, i) => (
        points2[i] && (
          <Trail
            key={i}
            width={0.05}
            length={1}
            decay={1}
            local={false}
            stride={10}
            interval={1}
            attenuation={(t) => t * t}
            color="#8b5cf6"
          >
            <mesh position={point}>
              <sphereGeometry args={[0.01]} />
              <meshBasicMaterial color="#8b5cf6" />
            </mesh>
          </Trail>
        )
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 30]} />
        
        <ParticleGalaxy />
        
        <Float
          speed={2}
          rotationIntensity={1}
          floatIntensity={2}
        >
          <DoubleHelix />
        </Float>

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Preload all />
      </Canvas>
    </div>
  );
}