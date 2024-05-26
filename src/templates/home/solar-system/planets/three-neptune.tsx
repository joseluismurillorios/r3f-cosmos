import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import imgs from '../assets/neptune/assets-neptune';
import url3 from '../assets/neptune/neptune_rings_diff_01.jpg';
// import url4 from '../assets/neptune/neptune_rings_alpha_01.jpg';
// import bump from '../assets/neptune/assets-neptune-bump';
import ThreePlanet from '../three-planet';

const ringGeo = new THREE.RingGeometry(1.3, 2.2, 64);
const pos = ringGeo.attributes.position;
const v3s = new THREE.Vector3();
for (let i = 0; i < pos.count; i += 1) {
  v3s.fromBufferAttribute(pos, i);
  ringGeo.attributes.uv.setXY(i, v3s.length() <= 1.31 ? 0 : 1, 1);
}

type ThreePlanetsProps = ThreeElements['group'];

function ThreePlanetsNeptune({ ...props }: ThreePlanetsProps) {
  const group = useRef<any>();
  const ringRef = useRef<any>(null);
  const textures = useTexture(imgs);
  const rings = useTexture({
    map: url3,
    // alphaMap: url4,
  });

  const { gl } = useThree();
  const anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame(() => {
    group.current.rotation.y += 0.0004;
    ringRef.current.rotation.z -= 0.0002;
  });

  useEffect(() => {
    (Object.keys(textures) as Array<keyof typeof textures>).forEach((k) => {
      textures[k].anisotropy = anisotropy;
    });
  }, []);
  return (
    <>
      <group ref={group} {...props}>
        <ThreePlanet maps={textures} rotation={[Math.PI, -Math.PI / 2, 0]} />
      </group>
      <group {...props}>
        <mesh
          ref={ringRef}
          receiveShadow
          castShadow
          geometry={ringGeo}
          rotation={[Math.PI / 2 + 0.03, 0.0, 0.0]}
        >
          <meshBasicMaterial
            map={rings.map as unknown as THREE.Texture}
            alphaMap={rings.map as unknown as THREE.Texture}
            // bumpScale={0.002}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
      </group>
    </>
  );
}

export default ThreePlanetsNeptune;
