import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("/models/earthModel.glb");

export default function Model() {
  const group = useRef(null);
  const { animations, scene } = useGLTF("/models/earthModel.glb");
  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();

  // Ensure the animation exists and is valid
  useEffect(() => {
    if (clips.length > 0) {
      const actionName = clips[0].name; // Use the first animation name
      const action = actions[actionName];

      if (action) {
        action.play();
        action.paused = true;
      } else {
        console.error(`Action for animation "${actionName}" not found.`);
      }
    } else {
      console.error("No animations found in the GLTF file.");
    }
  }, [clips, actions]);

  // Sync animation time with scroll
  useFrame(() => {
    if (clips.length > 0) {
      const actionName = clips[0].name;
      const action = actions[actionName];
      if (action) {
        const duration = action.getClip().duration;
        // Syncing with scroll
        action.time = duration * scroll.offset; 
      }
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}
