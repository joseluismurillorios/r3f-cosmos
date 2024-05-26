import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import imgs from '../assets/saturn/assets-saturn';
import url3 from '../assets/saturn/saturn_rings_diff_01.jpg';
import url4 from '../assets/saturn/saturn_rings_alpha_01.jpg';
// import bump from '../assets/saturn/assets-saturn-bump';
import ThreePlanet from '../three-planet';

const ringGeo = new THREE.RingGeometry(1.3, 2.6, 64);
const pos = ringGeo.attributes.position;
const v3s = new THREE.Vector3();
for (let i = 0; i < pos.count; i += 1) {
  v3s.fromBufferAttribute(pos, i);
  ringGeo.attributes.uv.setXY(i, v3s.length() <= 1.31 ? 0 : 1, 1);
}

type ThreePlanetsProps = ThreeElements['group'];

function ThreePlanetsSaturn({ ...props }: ThreePlanetsProps) {
  const group = useRef<any>();
  const ringRef = useRef<any>(null);
  const textures = useTexture(imgs);
  const rings = useTexture({
    map: url3,
    alphaMap: url4,
  });
  // const texturesBump = useTexture({
  //   left: bump.left,
  //   front: bump.front,
  //   right: bump.right,
  //   back: bump.back,
  //   top: bump.top,
  //   bottom: bump.bottom,
  // });

  const { gl } = useThree();
  const anisotropy = gl.capabilities.getMaxAnisotropy();

  useFrame(() => {
    group.current.rotation.y += 0.0004;
    ringRef.current.rotation.z -= 0.0002;
  });

  useEffect(() => {
    (Object.keys(textures) as Array<keyof typeof textures>).forEach((k) => {
      textures[k].anisotropy = anisotropy;
      // texturesBump[k].anisotropy = anisotropy;
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
            alphaMap={rings.alphaMap as unknown as THREE.Texture}
            // bumpScale={0.002}
            side={THREE.DoubleSide}
            transparent
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  );
}

export default ThreePlanetsSaturn;
