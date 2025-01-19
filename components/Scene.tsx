"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useState } from "react";
import * as THREE from 'three'
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
// This is not functional rn
function FogSetup({zoom}) {
  //add fog to scene
  const { scene } = useThree();
  
  //scene.fog = new THREE.Fog("white", zoom/2 + 3, 3);
  return null;
}
export default function Scene() {
  //
  const models = ['earthModel.glb', "cytosinemoleculeModel.glb", 'atom.glb']
  const [zoom, setZoom] = useState(2);//initial zoom
  const [modelNum, setModelNum] = useState(0);
  const handleScroll = (e) =>  {
    const maxZoom = 15;
    const minZoom = 1;
    let zoomStep = 0.1;
    setZoom((previousZoom) => {
      //determine scrolling up or down
      let newZoom = e.deltaY < 0 ? previousZoom - zoomStep : previousZoom + zoomStep;
      console.log(newZoom);
      //change scene to smaller object if we reach max zoom
      if (newZoom >= maxZoom && modelNum != models.length - 1) {
        setModelNum(modelNum => modelNum + 1); 
        console.log(modelNum);
        newZoom = 1;
      //change scene to larger object if we reach min zoom
      } else if (newZoom <= minZoom && modelNum != 0) {
        setModelNum(modelNum => modelNum - 1)
      }
      //constrain range
      return Math.max(1, Math.min(newZoom, maxZoom));
    });
    

  }; 
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true }} dpr={[1, 1.5]} style={{ width: '80vw', height: '80vh' }} onWheel={handleScroll}>
        {/* Directional light for additional illumination */}

        {/*Set up camera for zoom*/}
        <CameraSetup zoom={zoom}/>

        <pointLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={0.2} />

        <FogSetup zoom={zoom}/>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        <Suspense fallback={<Loader />}>
          {/* Add Environment */}
          <Environment
            files="/models/moonlit_night.exr"
            background={false}
            blur={0}
          /> 
          {/* Scroll Controls */}
          <ScrollControls  pages={3} damping={0.5} showScroll={false}>
            <Model modelName={models[modelNum]}/>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}