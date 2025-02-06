import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera,
  useGLTF,
  Environment,
  Preload,
  PointMaterial,
  Trail,
  Text3D
} from '@react-three/drei';
import * as THREE from 'three';

// Particle System
function ParticleSystem() {
  const count = 500;
  const points = useRef();
  
  const particlePositions = new Float32Array(count * 3);
  for(let i = 0; i < count; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 10;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      points.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

// Enhanced Floating Objects
const FloatingObjects = () => {
  const geometries = [
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.TorusGeometry(0.7, 0.2, 16, 100),
    new THREE.OctahedronGeometry(1)
  ];

  const materials = geometries.map(() => 
    new THREE.MeshStandardMaterial({
      color: '#8b5cf6',
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      emissive: '#8b5cf6',
      emissiveIntensity: 0.5
    })
  );

  const meshRefs = useRef([]);

  useFrame(({ clock, mouse }) => {
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.3;
        mesh.rotation.y = Math.cos(clock.getElapsedTime() * 0.5 + i) * 0.2;
        mesh.position.x += (mouse.x * 2 - mesh.position.x) * 0.1;
        mesh.position.y += (mouse.y * 2 - mesh.position.y) * 0.1;
      }
    });
  });

  return (
    <group>
      {geometries.map((geometry, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={1.5}
          floatIntensity={2}
        >
          <mesh
            ref={el => meshRefs.current[i] = el}
            geometry={geometry}
            material={materials[i]}
            scale={[1.5 - i * 0.3, 1.5 - i * 0.3, 1.5 - i * 0.3]}
            position={[i * 3 - 3, 0, 0]}
          />
        </Float>
      ))}
    </group>
  );
};

// DNA Helix Component
function DNAHelix() {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, -2, 0),
      new THREE.Vector3(-2, 2, 3),
      new THREE.Vector3(0, -2, 6),
      new THREE.Vector3(2, 2, 9),
      new THREE.Vector3(5, -2, 12)
    ]);
    return curve.getPoints(50);
  }, []);

  return points.map((point, i) => (
    <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <mesh position={point}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  ));
}

// Interactive Sphere Component
function InteractiveSphere({ position }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      if (hovered) {
        mesh.current.scale.set(1.2, 1.2, 1.2);
      } else {
        mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#8b5cf6"
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

// Animated Trail Component
function AnimatedTrail() {
  const ref = useRef();

  useFrame(({ mouse, viewport }) => {
    if (ref.current) {
      ref.current.position.x = (mouse.x * viewport.width) / 2;
      ref.current.position.y = (mouse.y * viewport.height) / 2;
    }
  });

  return (
    <Trail
      width={0.5}
      length={8}
      color="#8b5cf6"
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.25]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
    </Trail>
  );
}

// Enhanced Scene Component
const Scene3D = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 45 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        <DNAHelix />
        
        {[-4, 0, 4].map((x, i) => (
          <InteractiveSphere key={i} position={[x, 2, 0]} />
        ))}
        
        <AnimatedTrail />
        
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
            position={[-5, 5, 0]}
          >
            Portfolio
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" />
          </Text3D>
        </Float>

        <Environment preset="city" />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default Scene3D;