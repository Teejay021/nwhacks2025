"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { useProgress, Html, ScrollControls, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import CardPanel from "./CardPanel";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

function CameraSetup({ zoom }) {
  const { camera } = useThree();
  // Apply zoom each frame
  if (camera) {
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  }
  return null;
}

function FogSetup({ zoom }) {
  const { scene } = useThree();
  scene.fog = new THREE.Fog("white", zoom / 2 + 3, 3);
  return null;
}

export default function Scene() {
  const models = [
    { name: 'atom.glb', title: 'Atom', content: 'An atom is the basic unit of matter, made up of protons, neutrons, and electrons. The nucleus, at the center, contains protons and neutrons, while electrons orbit around the nucleus in energy levels. Atoms combine to form molecules and make up all substances in the universe.', minZoom: 0.2, maxZoom: 10.0, zoomStep: 0.05},
    { name: 'cytosinemoleculeModel.glb', title: 'Molecule', content: 'Cytosine is one of the four nitrogenous bases found in DNA and RNA, which are essential for genetic coding. It pairs with guanine (G) in DNA through hydrogen bonds. Cytosine is a pyrimidine base, and its structure consists of a six-membered ring containing nitrogen and carbon atoms.', minZoom: 0.2, maxZoom: 10.0, zoomStep: 0.2},
    { name: 'DNAHelix.glb', title: 'DNA Helix', content: 'A DNA helix refers to the structure of deoxyribonucleic acid (DNA), which carries genetic information in living organisms. DNA is shaped like a double helix, consisting of two strands twisted around each other. Each strand is made up of nucleotide units that encode genetic instructions for biological functions and development.', minZoom: 0.5, maxZoom: 20.0, zoomStep: 0.4 },
    { name: 'beaver.glb', title: 'Beaver', content: 'This is a beaver model.', minZoom: 0.75, maxZoom: 10.0, zoomStep: 0.25 },
    { name: 'earth.glb', title: 'Earth', content: 'Earth is the third planet from the Sun and the only known planet to support life. It has a diverse environment, with land, water, and air that sustain a variety of ecosystems. Earth’s atmosphere contains oxygen and nitrogen, and its surface includes oceans, mountains, and forests.', minZoom: 2, maxZoom: 25.0, zoomStep: 0.5 },
    { name: 'solarsystem.glb', title: 'Solar System', content: 'The solar system is a collection of celestial bodies, including the Sun, eight planets (such as Earth and Mars), moons, dwarf planets (like Pluto), asteroids, comets, and other objects. The Sun is at the center, providing gravitational pull and energy that keeps the planets in orbit. The solar system is located in the Milky Way galaxy.', minZoom: 0.3, maxZoom: 11.0, zoomStep: 0.3},
    { name: 'Milkywaygalaxy.glb', title: 'Milky Way', content: 'The Milky Way is the galaxy that contains our solar system, and it is a spiral galaxy made up of billions of stars, dust, and gas. It is shaped like a flat disk with spiral arms. The galaxy spans over 100,000 light-years in diameter and is just one of billions of galaxies in the universe.', minZoom: 1, maxZoom: 30.0, zoomStep: 1 },
    { name: 'observableuniverse.glb', title: 'Observable Universe', content: 'The observable universe refers to the portion of the entire universe that we can observe from Earth, based on the distance light has traveled since the Big Bang. It spans about 93 billion light-years in diameter. The observable universe includes all the galaxies, stars, planets, and other cosmic objects that emit light or other forms of radiation that we can detect with current technology, like telescopes.', minZoom: 3, maxZoom: 14.0, zoomStep: 0.4 },
  ];
  // preload all models in
  useEffect(() => {
    models.forEach((modelEntry) => useGLTF.preload('/models/' + modelEntry.name));
  }, []);

  const [zoom, setZoom] = useState(models[0].minZoom + 0.5); // Initial zoom on site start
  const [modelNum, setModelNum] = useState(0);
  const [currentModel, setCurrentModel] = useState(models[0]);

  
  const handleScroll = (e) => {
    setZoom((previousZoom) => {
      // how fast we will zoom in
      let zoomStep = models[modelNum].zoomStep;
      
      // wish i knew how to use switch statements in react
      // speed up zoom as we get closer to models to smooth out zooming in
      if ( previousZoom >= models[modelNum].maxZoom / 3.0 ) {
        if (modelNum === 1) {
          zoomStep *= 2.5;
        } else if (modelNum === 2 || modelNum === 5 || modelNum == 4 || modelNum == 3) {
          zoomStep *= 2;
        } 
      } else if (previousZoom <= 2) { //slow down zoom when we are zoomed out to smooth out zooming out
        if (modelNum === 2 || modelNum == 1 || modelNum == 5) {
          zoomStep /= 2.0
        }
      }
      
      // Determine scrolling up or down
      let newZoom = e.deltaY < 0 ? previousZoom - zoomStep : previousZoom + zoomStep;
      
      // Change scene to smaller object if we reach max zoom
      if (newZoom >= models[modelNum].maxZoom && modelNum != 0) {
        setModelNum(modelNum => modelNum - 1);
        setCurrentModel(models[modelNum - 1]);

        // Set zoom to min value for the next model so we enter zoomed out
        newZoom = models[modelNum - 1].minZoom; 

        // return early so we can ensure the correct zoom value for next frame
        return newZoom;

      // Change scene to larger object if we reach min zoom
      } else if (newZoom <= models[modelNum].minZoom && modelNum != models.length - 1) {
        setModelNum(modelNum => modelNum + 1);
        setCurrentModel(models[modelNum + 1]);

         // Set zoom for the next model so we enter the scene zoomed in
        newZoom = models[modelNum + 1].maxZoom;

        // return early so we can ensure the correct zoom value for next frame
        return newZoom;
      }
      // Constrain range
      return Math.max(models[modelNum].minZoom, Math.min(newZoom, models[modelNum].maxZoom));
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true }} dpr={[1, 1.5]} style={{ width: '80vw', height: '80vh' }} onWheel={handleScroll}>
        <CameraSetup zoom={zoom} />
        <FogSetup zoom={zoom} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={0.2} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        <Suspense fallback={<Loader />}>
          <Environment files="/models/moonlit_night.exr" background={false} blur={0} />
          <ScrollControls pages={3} damping={0.5} showScroll={false}>
            <Model modelName={currentModel.name} />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <CardPanel title={currentModel.title} content={currentModel.content} />
    </div>
  );
}