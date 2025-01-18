import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, AmbientLight, Sphere } from '@react-three/drei';

const ThreeCanvas: React.FC = () => {
  useEffect(() => {
    // Any additional setup can be done here
  }, []);

  return (
    <Canvas>
      <AmbientLight intensity={0.5} />
      <OrbitControls />
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshStandardMaterial attach="material" color="orange" />
      </Sphere>
    </Canvas>
  );
};

export default ThreeCanvas;