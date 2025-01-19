"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useState } from "react";

import { useProgress, Html, ScrollControls, Environment, OrbitControls } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}
function CameraSetup({zoom}) {
  const {camera} = useThree();
   //apply zoom each frame
  if (camera) {
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  };
 
  
  
  return null;
}
export default function Scene() {
  const [zoom, setZoom] = useState(2);//initial zoom
  const handleScroll = (e) =>  {
    const zoomStep = 0.05;
    setZoom((previousZoom) => {
      //determine scrolling up or down
      const newZoom = e.deltaY < 0 ? previousZoom - zoomStep : previousZoom + zoomStep;
      //constrain range
      console.log(newZoom);
      return Math.max(1, Math.min(newZoom, 5));
    });
  }; 
 
  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true }} dpr={[1, 1.5]} style={{ width: '80vw', height: '80vh' }} onWheel={handleScroll}>
        {/* Directional light for additional illumination */}

        {/*Set up camera for zoom*/}
        <CameraSetup zoom={zoom}/>
        <pointLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={0.2} />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />

        <Suspense fallback={<Loader />}>
          {/* Add Environment */}
          <Environment
            files="/models/moonlit_night.exr"
            background={false}
            blur={0}
          />


          {/* Scroll Controls */}
          <ScrollControls damping={0.5} pages={3}>
            <Model />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
