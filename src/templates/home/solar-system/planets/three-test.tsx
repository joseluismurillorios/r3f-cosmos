import { useRef } from 'react';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { BackSide, Vector3 } from 'three';
import { folder, useControls } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';

import sunVert from '../shaders/jup/jupVert.glsl?raw';
import sunFrag from '../shaders/jup/jupFrag.glsl?raw';
import glowVert from '../shaders/jup/glowVert.glsl?raw';
import glowFrag from '../shaders/jup/glowFrag.glsl?raw';
import { createSketchMaterial } from '@/helpers/helper-sketch';
import { makeControls } from '@/helpers/helper-leva';
import { throttle } from '@/helpers/helper-util';

type ThreePlanetsProps = ThreeElements['group'] & {
  store: StoreType;
  onUpdate?: () => void;
};

const { SketchMaterial: SunMaterial } = createSketchMaterial(sunVert, sunFrag, {
  tCube: 0,
  uCamPos: new Vector3(),
});

const { SketchMaterial: GlowMaterial } = createSketchMaterial(glowVert, glowFrag);

function ThreePlanetsSun({ store, onUpdate, ...props }: ThreePlanetsProps) {
  const group = useRef<any>();
  const sunRef = useRef<any>(null);
  const sunMatRef = useRef(new SunMaterial());
  const glowMatRef = useRef(new GlowMaterial());

  const onChange = (k: string, v: any) => {
    // console.log('onChange', k, v, sunMatRef.current.uniforms[k]);
    if (k && sunMatRef.current && sunMatRef.current.uniforms[k]) {
      sunMatRef.current.uniforms[k].value = v;
    }
    if (k && glowMatRef.current && glowMatRef.current.uniforms[k]) {
      glowMatRef.current.uniforms[k].value = v;
    }
    onUpdate?.();
  };

  const delayedChange = useRef(throttle(onChange, 50)).current;
  const controls = makeControls(glowVert, glowFrag, delayedChange, undefined, true);

  useControls(
    {
      SUN: folder(controls, { collapsed: true }),
    },
    { store }
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // group.current.rotation.y += 0.0004;
    onChange('time', t * 0.5);
  });

  return (
    <group ref={group} {...props}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 36, 36]} />
        <shaderMaterial
          attach="material"
          {...sunMatRef.current}
          // side={DoubleSide}
          // transparent
          // depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.25, 36, 36]} />
        <shaderMaterial
          attach="material"
          {...glowMatRef.current}
          side={BackSide}
          transparent
          // blending={NormalBlending}
          // depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default ThreePlanetsSun;
