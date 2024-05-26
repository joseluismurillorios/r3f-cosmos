import * as THREE from 'three';
import { ThreeElements, useThree } from '@react-three/fiber';
import { folder, useControls } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';

import { useRef } from 'react';
import planetVert from './shaders/planetVert.glsl';
import planetFrag from './shaders/planetFrag.glsl';
import { throttle } from '@/helpers/helper-util';

const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

type ThreePlanetsProps = {
  color?: THREE.ColorRepresentation;
  store: StoreType;
} & ThreeElements['group'];

function ThreePlanetsAtm({ color = '#555', store, ...props }: ThreePlanetsProps) {
  const matRef = useRef<any>();
  const { gl, scene, camera } = useThree();
  const unis = useRef<any>({
    coeficient: {
      value: 1.2,
    },
    power: {
      value: 8.0,
    },
    glowColor: {
      value: color,
    },
  });

  const onChange = (k: string, v: any) => {
    if (k && matRef.current && matRef.current.isShaderMaterial) {
      matRef.current.uniforms[k].value = v;
      // if (!animateRef.current) {
      //   gl.render(scene, camera);
      // }
      gl.render(scene, camera);
    }
  };

  const delayedChange = useRef(throttle(onChange, 50)).current;

  useControls(
    {
      PLANET: folder(
        {
          coeficient: {
            value: unis.current.coeficient.value,
            min: 0.0,
            max: 2.0,
            step: 0.001,
            onChange: (v) => {
              delayedChange('coeficient', v);
            },
          },
          power: {
            value: 8.0,
            min: 0.0,
            max: 25.0,
            step: 0.001,
            onChange: (v) => {
              delayedChange('power', v);
            },
          },
        },
        { collapsed: true }
      ),
    },
    { store }
  );
  return (
    <group {...props}>
      <mesh geometry={sphereGeo} scale={1.02}>
        <shaderMaterial
          ref={matRef}
          vertexShader={planetVert}
          fragmentShader={planetFrag}
          uniforms={unis.current}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default ThreePlanetsAtm;
