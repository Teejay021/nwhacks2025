import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const RotatingSphere: React.FC = () => {
  const sphereRef = useRef<any>(); // Reference to the Sphere
  const mousePosition = useRef({ x: 0, y: 0 }); // Global mouse position tracker

  // Global mouse tracking using the window object
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position to range [-1, 1]
      mousePosition.current.x = (event.clientX / innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / innerHeight) * 2 + 1;
    };

    // Attach the event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update sphere's rotation based on mouse position
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = mousePosition.current.x * Math.PI;
      sphereRef.current.rotation.x = mousePosition.current.y * Math.PI;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color="orange" />
    </Sphere>
  );
};

const ThreeCanvas: React.FC = ({ children }) => {
  return (
    <Canvas>
      {/* Add ambient light */}
      <ambientLight intensity={0.5} />

      {/* Add orbit controls */}
      <OrbitControls />

      {/* Add children components */}
      {children}
    </Canvas>
  );
};

export default ThreeCanvas;
