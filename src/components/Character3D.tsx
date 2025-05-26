
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Character3DProps {
  animation: string;
  scale: number;
}

const Character3D = ({ animation, scale }: Character3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime(time + delta);
    
    if (!groupRef.current) return;

    // Base animations
    switch (animation) {
      case 'idle':
        // Gentle breathing animation
        if (bodyRef.current) {
          bodyRef.current.scale.y = 1 + Math.sin(time * 2) * 0.05;
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
        }
        break;
        
      case 'happy':
        // Jumping animation
        groupRef.current.position.y = Math.abs(Math.sin(time * 8)) * 0.3;
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = Math.sin(time * 8) * 0.5 + 0.5;
          rightArmRef.current.rotation.z = -Math.sin(time * 8) * 0.5 - 0.5;
        }
        break;
        
      case 'dancing':
        // Dancing animation
        groupRef.current.rotation.y = Math.sin(time * 4) * 0.3;
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = Math.sin(time * 6) * 0.8;
          rightArmRef.current.rotation.z = -Math.sin(time * 6) * 0.8;
        }
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = Math.sin(time * 6) * 0.3;
          rightLegRef.current.rotation.x = -Math.sin(time * 6) * 0.3;
        }
        break;
        
      case 'surprised':
        // Startled animation
        if (headRef.current) {
          headRef.current.scale.setScalar(1 + Math.sin(time * 10) * 0.1);
        }
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = 1.2;
          rightArmRef.current.rotation.z = -1.2;
        }
        break;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Head */}
      <Sphere ref={headRef} position={[0, 1.5, 0]} args={[0.4]} castShadow>
        <meshPhongMaterial args={[{ color: "#ffdbac" }]} />
      </Sphere>
      
      {/* Eyes */}
      <Sphere position={[-0.15, 1.6, 0.35]} args={[0.08]} castShadow>
        <meshPhongMaterial args={[{ color: "white" }]} />
      </Sphere>
      <Sphere position={[0.15, 1.6, 0.35]} args={[0.08]} castShadow>
        <meshPhongMaterial args={[{ color: "white" }]} />
      </Sphere>
      <Sphere position={[-0.15, 1.6, 0.4]} args={[0.04]} castShadow>
        <meshPhongMaterial args={[{ color: "black" }]} />
      </Sphere>
      <Sphere position={[0.15, 1.6, 0.4]} args={[0.04]} castShadow>
        <meshPhongMaterial args={[{ color: "black" }]} />
      </Sphere>
      
      {/* Nose */}
      <Sphere position={[0, 1.5, 0.35]} args={[0.03]} castShadow>
        <meshPhongMaterial args={[{ color: "#ffbf80" }]} />
      </Sphere>
      
      {/* Mouth */}
      <Sphere position={[0, 1.35, 0.35]} args={[0.1, 0.05]} castShadow>
        <meshPhongMaterial args={[{ color: "#ff6b6b" }]} />
      </Sphere>
      
      {/* Hair */}
      <Sphere position={[0, 1.8, 0]} args={[0.45, 0.3]} castShadow>
        <meshPhongMaterial args={[{ color: "#8b4513" }]} />
      </Sphere>
      
      {/* Body */}
      <Cylinder ref={bodyRef} position={[0, 0.5, 0]} args={[0.3, 0.4, 1]} castShadow>
        <meshPhongMaterial args={[{ color: "#4ecdc4" }]} />
      </Cylinder>
      
      {/* Arms */}
      <Cylinder ref={leftArmRef} position={[-0.6, 0.7, 0]} args={[0.1, 0.1, 0.8]} rotation={[0, 0, 0.3]} castShadow>
        <meshPhongMaterial args={[{ color: "#ffdbac" }]} />
      </Cylinder>
      <Cylinder ref={rightArmRef} position={[0.6, 0.7, 0]} args={[0.1, 0.1, 0.8]} rotation={[0, 0, -0.3]} castShadow>
        <meshPhongMaterial args={[{ color: "#ffdbac" }]} />
      </Cylinder>
      
      {/* Hands */}
      <Sphere position={[-0.9, 0.4, 0]} args={[0.12]} castShadow>
        <meshPhongMaterial args={[{ color: "#ffdbac" }]} />
      </Sphere>
      <Sphere position={[0.9, 0.4, 0]} args={[0.12]} castShadow>
        <meshPhongMaterial args={[{ color: "#ffdbac" }]} />
      </Sphere>
      
      {/* Legs */}
      <Cylinder ref={leftLegRef} position={[-0.2, -0.4, 0]} args={[0.12, 0.12, 0.8]} castShadow>
        <meshPhongMaterial args={[{ color: "#45b7d1" }]} />
      </Cylinder>
      <Cylinder ref={rightLegRef} position={[0.2, -0.4, 0]} args={[0.12, 0.12, 0.8]} castShadow>
        <meshPhongMaterial args={[{ color: "#45b7d1" }]} />
      </Cylinder>
      
      {/* Feet */}
      <Box position={[-0.2, -0.9, 0.1]} args={[0.2, 0.1, 0.3]} castShadow>
        <meshPhongMaterial args={[{ color: "#2c3e50" }]} />
      </Box>
      <Box position={[0.2, -0.9, 0.1]} args={[0.2, 0.1, 0.3]} castShadow>
        <meshPhongMaterial args={[{ color: "#2c3e50" }]} />
      </Box>
    </group>
  );
};

export default Character3D;
