
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CharacterCustomization } from '@/hooks/useCharacterCustomization';

interface Character3DProps {
  animation: string;
  scale: number;
  position: [number, number, number];
  customization: CharacterCustomization;
}

const Character3D = ({ 
  animation, 
  scale, 
  position,
  customization
}: Character3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    const newTime = time + delta;
    setTime(newTime);
    
    if (!groupRef.current) return;

    // Base animations
    switch (animation) {
      case 'idle':
        if (bodyRef.current) {
          bodyRef.current.scale.y = 1 + Math.sin(newTime * 2) * 0.05;
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(newTime * 0.5) * 0.1;
        }
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = 0.3;
          rightArmRef.current.rotation.z = -0.3;
          leftArmRef.current.rotation.x = 0;
          rightArmRef.current.rotation.x = 0;
        }
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = 0;
          rightLegRef.current.rotation.x = 0;
        }
        break;

      case 'walking':
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(newTime * 6) * 0.5;
          rightArmRef.current.rotation.x = -Math.sin(newTime * 6) * 0.5;
          leftArmRef.current.rotation.z = 0.3;
          rightArmRef.current.rotation.z = -0.3;
        }
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = Math.sin(newTime * 6) * 0.8;
          rightLegRef.current.rotation.x = -Math.sin(newTime * 6) * 0.8;
        }
        if (bodyRef.current) {
          bodyRef.current.rotation.z = Math.sin(newTime * 6) * 0.1;
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(newTime * 3) * 0.15;
        }
        break;
        
      case 'happy':
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(newTime * 8)) * 0.3;
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = Math.sin(newTime * 8) * 0.5 + 0.5;
          rightArmRef.current.rotation.z = -Math.sin(newTime * 8) * 0.5 - 0.5;
          leftArmRef.current.rotation.x = 0;
          rightArmRef.current.rotation.x = 0;
        }
        break;
        
      case 'dancing':
        groupRef.current.rotation.y = Math.sin(newTime * 4) * 0.3;
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(newTime * 8)) * 0.2;
        
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = Math.sin(newTime * 6) * 0.8 + 0.5;
          rightArmRef.current.rotation.z = -Math.sin(newTime * 6) * 0.8 - 0.5;
          leftArmRef.current.rotation.x = Math.sin(newTime * 4) * 0.3;
          rightArmRef.current.rotation.x = -Math.sin(newTime * 4) * 0.3;
        }
        
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = Math.sin(newTime * 8) * 0.3;
          rightLegRef.current.rotation.x = -Math.sin(newTime * 8) * 0.3;
        }
        
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(newTime * 5) * 0.2;
          headRef.current.rotation.z = Math.sin(newTime * 3) * 0.1;
        }
        
        if (bodyRef.current) {
          bodyRef.current.rotation.z = Math.sin(newTime * 4) * 0.15;
        }
        break;
        
      case 'surprised':
        if (headRef.current) {
          headRef.current.scale.setScalar(1 + Math.sin(newTime * 10) * 0.1);
        }
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.z = 1.2;
          rightArmRef.current.rotation.z = -1.2;
          leftArmRef.current.rotation.x = 0;
          rightArmRef.current.rotation.x = 0;
        }
        break;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={position} castShadow>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 1.6, 0.35]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhongMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 1.6, 0.35]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhongMaterial color="white" />
      </mesh>
      <mesh position={[-0.15, 1.6, 0.4]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color="black" />
      </mesh>
      <mesh position={[0.15, 1.6, 0.4]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color="black" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.5, 0.35]} castShadow>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshPhongMaterial color="#ffbf80" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 1.35, 0.35]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshPhongMaterial color="#ff6b6b" />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshPhongMaterial color={customization.hairColor} />
      </mesh>
      
      {/* Hat (if enabled) */}
      {customization.hasHat && (
        <mesh position={[0, 2.1, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.4, 0.2, 32]} />
          <meshPhongMaterial color={customization.hatColor} />
        </mesh>
      )}
      
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 1, 32]} />
        <meshPhongMaterial color={customization.clothingColor} />
      </mesh>
      
      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.6, 0.7, 0]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.6, 0.7, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-0.9, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.9, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhongMaterial color="#ffdbac" />
      </mesh>
      
      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.2, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshPhongMaterial color="#45b7d1" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.2, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshPhongMaterial color="#45b7d1" />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.2, -0.9, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.2, -0.9, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshPhongMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
};

export default Character3D;
