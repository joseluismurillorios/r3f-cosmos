import React, { useEffect, useRef } from 'react';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import imgs from '../assets/jupiter/assets-jupiter';
// import bump from '../assets/jupiter/assets-jupiter-bump';
import ThreePlanet from '../three-planet';

type ThreePlanetsProps = ThreeElements['group'];

function ThreePlanetsJupiter({ ...props }: ThreePlanetsProps) {
  const group = useRef<any>();
  const textures = useTexture(imgs);
  // const texturesBump = useTexture(bump);

  const { gl } = useThree();
  const anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame(() => {
    group.current.rotation.y += 0.0004;
  });

  useEffect(() => {
    (Object.keys(textures) as Array<keyof typeof textures>).forEach((k) => {
      textures[k].anisotropy = anisotropy;
      // texturesBump[k].anisotropy = anisotropy;
    });
  }, []);
  return (
    <group ref={group} {...props}>
      <ThreePlanet maps={textures} rotation={[Math.PI, 0, 0]} />
    </group>
  );
}

export default ThreePlanetsJupiter;
