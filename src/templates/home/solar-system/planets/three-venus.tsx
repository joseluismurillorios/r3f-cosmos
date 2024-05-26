import { useEffect, useRef } from 'react';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import imgs from '../assets/venus/assets-venus';
// import bump from '../assets/venus/assets-venus-bump';
import ThreePlanet from '../three-planet';

type ThreePlanetsProps = ThreeElements['group'];

function ThreePlanetsVenus({ ...props }: ThreePlanetsProps) {
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
      <ThreePlanet maps={textures} rotation={[Math.PI, -Math.PI / 2, 0]} />
    </group>
  );
}

export default ThreePlanetsVenus;
