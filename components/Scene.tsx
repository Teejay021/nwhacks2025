"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense } from "react";
import { useProgress, Html, ScrollControls, Environment } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ antialias: true }} dpr={[1, 1.5]} className="relative h-svh">
      {/* Directional light for additional illumination */}
      <directionalLight position={[-5, -5, 5]} intensity={4} />

      <Suspense fallback={<Loader />}>
        {/* Add Environment */}
        <Environment
          files="/models/moonlit_night.exr"
          background={false}
          blur={0}
        />

        {/*Scroll Controls */}
        <ScrollControls damping={0.5} pages={3}>
          <Model />
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
