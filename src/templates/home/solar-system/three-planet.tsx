import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// import model from './assets/planet-transformed.glb';

const modelUrl = new URL('./assets/planet-transformed.glb', import.meta.url).href;

// TODO: check bump
type ThreePlanetProps = ThreeElements['group'] & {
  maps?: any;
  bumps?: any;
  alphas?: any;
  tranparent?: boolean;
};

type GLTFResult = GLTF & {
  nodes: {
    planet_1: THREE.Mesh;
    planet_2: THREE.Mesh;
    planet_3: THREE.Mesh;
    planet_4: THREE.Mesh;
    planet_5: THREE.Mesh;
    planet_6: THREE.Mesh;
  };
};

function ThreePlanet({
  maps = {},
  bumps = {},
  alphas = {},
  tranparent,
  ...props
}: ThreePlanetProps) {
  const group = useRef<any>();
  const { nodes } = useGLTF(modelUrl) as unknown as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.planet_1.geometry}>
        <meshStandardMaterial
          map={maps.front}
          alphaMap={alphas.front}
          bumpMap={bumps.front}
          bumpScale={0.1}
          transparent={tranparent}
        />
      </mesh>
      <mesh geometry={nodes.planet_2.geometry}>
        <meshStandardMaterial
          map={maps.left}
          alphaMap={alphas.left}
          bumpMap={bumps.left}
          bumpScale={0.1}
          transparent={tranparent}
        />
      </mesh>
      <mesh geometry={nodes.planet_3.geometry}>
        <meshStandardMaterial
          map={maps.back}
          alphaMap={alphas.back}
          bumpMap={bumps.back}
          bumpScale={0.1}
          transparent={tranparent}
        />
      </mesh>
      <mesh geometry={nodes.planet_4.geometry}>
        <meshStandardMaterial
          map={maps.right}
          alphaMap={alphas.right}
          bumpMap={bumps.right}
          bumpScale={0.1}
          transparent={tranparent}
        />
      </mesh>
      <mesh geometry={nodes.planet_5.geometry}>
        <meshStandardMaterial
          map={maps.bottom}
          alphaMap={alphas.bottom}
          bumpMap={bumps.bottom}
          bumpScale={0.1}
          transparent={tranparent}
        />
      </mesh>
      <mesh geometry={nodes.planet_6.geometry}>
        <meshStandardMaterial
          map={maps.top}
          alphaMap={alphas.top}
          bumpMap={bumps.top}
          bumpScale={0.1}
          transparent={tranparent}
        />
      </mesh>
    </group>
  );
}

export default ThreePlanet;
