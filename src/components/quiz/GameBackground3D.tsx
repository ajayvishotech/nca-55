import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const FloatingCrystal = () => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <motion.div
        animate={{
          rotateY: Math.PI * 2,
          rotateX: Math.PI * 0.25,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ display: 'none' }} // This is just for the animation values
      />
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshPhongMaterial 
          color="#9b87f5"
          shininess={100}
          specular={new THREE.Color("#ffffff")}
        />
      </mesh>
    </Float>
  );
};

export const GameBackground3D = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars 
          radius={50}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
        />
        <FloatingCrystal />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};