
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
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
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 1.6, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhongMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 1.6, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhongMaterial color="white" />
      </mesh>
      <mesh position={[-0.15, 1.6, 0.4]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color="black" />
      </mesh>
      <mesh position={[0.15, 1.6, 0.4]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color="black" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.5, 0.35]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhongMaterial color="#ffbf80" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 1.35, 0.35]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhongMaterial color="#ff6b6b" />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshPhongMaterial color="#8b4513" />
      </mesh>
      
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 32]} />
        <meshPhongMaterial color="#4ecdc4" />
      </mesh>
      
      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.6, 0.7, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.6, 0.7, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.9, 0.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.9, 0.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshPhongMaterial color="#45b7d1" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshPhongMaterial color="#45b7d1" />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.2, -0.9, 0.1]}>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.2, -0.9, 0.1]}>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
};

export default Character3D;
