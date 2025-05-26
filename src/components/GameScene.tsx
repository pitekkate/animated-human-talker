
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Character3D from './Character3D';
import FemaleCharacter3D from './FemaleCharacter3D';

interface GameSceneProps {
  maleAnimation: string;
  femaleAnimation: string;
  characterScale: number;
  malePosition: [number, number, number];
  femalePosition: [number, number, number];
}

const GameScene = ({ 
  maleAnimation,
  femaleAnimation,
  characterScale, 
  malePosition,
  femalePosition
}: GameSceneProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        shadows
        gl={{ antialias: true }}
        className="bg-gradient-to-b from-sky-300 to-green-200"
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[15, 15]} />
          <meshPhongMaterial color="#90EE90" />
        </mesh>
        
        {/* Male Character */}
        <Suspense fallback={null}>
          <Character3D 
            animation={maleAnimation} 
            scale={characterScale} 
            position={malePosition}
          />
        </Suspense>
        
        {/* Female Character */}
        <Suspense fallback={null}>
          <FemaleCharacter3D 
            animation={femaleAnimation} 
            scale={characterScale} 
            position={femalePosition}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GameScene;
