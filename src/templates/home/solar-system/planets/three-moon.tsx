import { useEffect, useRef } from 'react';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import imgs from '../assets/moon/assets-moon';
// import bump from '../assets/moon/assets-moon-bump';
import ThreePlanet from '../three-planet';

type ThreePlanetsProps = ThreeElements['group'];

function ThreePlanetsMoon({ ...props }: ThreePlanetsProps) {
  const group = useRef<any>();
  const textures = useTexture(imgs);

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
      <ThreePlanet maps={textures} rotation={[0, 8.5, 0]} />
    </group>
  );
}

export default ThreePlanetsMoon;
