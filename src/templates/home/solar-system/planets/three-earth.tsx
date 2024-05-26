import { useEffect, useRef } from 'react';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import imgs from '../assets/earth/assets-earth';
import clouds from '../assets/earth/assets-clouds';
import ThreePlanet from '../three-planet';

type ThreePlanetsEarthProps = ThreeElements['group'];

function ThreePlanetsEarth({ ...props }: ThreePlanetsEarthProps) {
  const group = useRef<any>();
  const group2 = useRef<any>();
  const textures = useTexture(imgs);
  const texturesClouds = useTexture(clouds);

  const { gl } = useThree();
  const anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame(() => {
    group.current.rotation.y += 0.0004;
    group2.current.rotation.y += 0.00045;
  });

  useEffect(() => {
    (Object.keys(textures) as Array<keyof typeof textures>).forEach((k) => {
      textures[k].anisotropy = anisotropy;
      texturesClouds[k].anisotropy = anisotropy;
    });
  }, []);
  return (
    <>
      <group ref={group} {...props}>
        <ThreePlanet maps={textures} rotation={[0, -Math.PI / 2, 0]} />
      </group>
      <group ref={group2} {...props}>
        <ThreePlanet alphas={texturesClouds} scale={1.01} tranparent />
      </group>
    </>
  );
}

export default ThreePlanetsEarth;
