
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Character3D from './Character3D';

interface GameSceneProps {
  animation: string;
  characterScale: number;
}

const GameScene = ({ animation, characterScale }: GameSceneProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 50 }}
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
        
        {/* Ground */}
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshPhongMaterial color="#90EE90" />
        </mesh>
        
        {/* Character wrapped in Suspense */}
        <Suspense fallback={null}>
          <Character3D animation={animation} scale={characterScale} />
        </Suspense>
        
        {/* Controls must be inside Canvas and after other components */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
};

export default GameScene;
