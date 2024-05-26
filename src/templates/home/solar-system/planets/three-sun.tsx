import { useEffect, useRef } from 'react';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import {
  BackSide,
  CubeCamera,
  DoubleSide,
  LinearMipMapLinearFilter,
  RGBAFormat,
  Vector3,
  Vector4,
  WebGLCubeRenderTarget,
  sRGBEncoding,
} from 'three';
import { shaderMaterial } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';

import sunVert from '../shaders/sunVert.glsl?raw';
import sunFrag from '../shaders/sunFrag.glsl?raw';
import glowVert from '../shaders/glowVert.glsl?raw';
import glowFrag from '../shaders/glowFrag.glsl?raw';
import perlinVert from '../shaders/perlin/vertex.glsl';
import perlinFrag from '../shaders/perlin/fragment.glsl';
import { createSketchMaterial } from '@/helpers/helper-sketch';
import { makeControls } from '@/helpers/helper-leva';
import { throttle } from '@/helpers/helper-util';

type ThreePlanetsProps = ThreeElements['group'] & {
  store: StoreType;
  onUpdate?: () => void;
};

const getMaterial = (vert: string, frag: string, uniforms: any = {}) => {
  const Material = shaderMaterial(
    {
      time: 0,
      resolution: new Vector4(),
      ...uniforms,
    },
    vert,
    frag
  );
  return new Material({ extensions: { derivatives: true } });
};

const { SketchMaterial: SunMaterial } = createSketchMaterial(sunVert, sunFrag, {
  tCube: 0,
  uCamPos: new Vector3(),
});

const { SketchMaterial: GlowMaterial } = createSketchMaterial(glowVert, glowFrag);

function ThreePlanetsSun({ store, onUpdate, ...props }: ThreePlanetsProps) {
  const { gl, scene, clock, camera } = useThree();
  const group = useRef<any>();
  const perlinRef = useRef<any>();
  const sunRef = useRef<any>(null);
  const sunMatRef = useRef(new SunMaterial());
  const glowMatRef = useRef(new GlowMaterial());

  const perlinMatRef = useRef(
    getMaterial(perlinVert, perlinFrag, {
      tCube: 0,
    })
  );

  const sunPosRef = useRef(new Vector3());
  const renderTarget = useRef(
    new WebGLCubeRenderTarget(1024, {
      format: RGBAFormat,
      generateMipmaps: true,
      minFilter: LinearMipMapLinearFilter,
      encoding: sRGBEncoding,
    })
  ).current;
  const cubeCamera = useRef<CubeCamera>(null);

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
  const controls = makeControls(sunVert, sunFrag, delayedChange, undefined, true);

  useControls(
    {
      SUN: folder(controls, { collapsed: true }),
    },
    { store }
  );

  const updateRender = () => {
    if (!sunRef.current) {
      return;
    }
    sunRef.current.getWorldPosition(sunPosRef.current);
    sunRef.current.visible = false;
    cubeCamera.current?.update(gl, scene);
    sunRef.current.visible = true;
    // perlinMatRef.current.uniforms.time.value += 0.0004;
    sunMatRef.current.uniforms.tCube.value = renderTarget.texture;
    sunMatRef.current.uniforms.uCamPos.value = sunPosRef.current;
  };

  // const delayedUpdate = useRef(throttle(updateRender, 1000)).current;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.y += 0.0004;
    sunMatRef.current.uniforms.time.value = t;
    // delayedUpdate();
  });

  useEffect(() => {
    // console.log(renderTarget, cubeCamera.current);
    // perlinMatRef.current.uniforms.time.value = 1;
    // TODO: render texture every nth frame just in case
    const time1 = setTimeout(() => {
      updateRender();
    }, 10);
    // const time2 = setTimeout(() => {
    //   updateRender();
    // }, 100);
    const time3 = setTimeout(() => {
      updateRender();
    }, 2000);
    return () => {
      clearTimeout(time1);
      // clearTimeout(time2);
      clearTimeout(time3);
    };
  }, []);

  return (
    <group ref={group} {...props}>
      <mesh ref={perlinRef}>
        <sphereGeometry args={[1, 36, 36]} />
        <shaderMaterial
          attach="material"
          {...perlinMatRef.current}
          side={DoubleSide}
          // transparent
          // depthWrite={false}
        />
      </mesh>
      <cubeCamera
        name="cubeCamera"
        ref={cubeCamera}
        position={[0, 0, 0]}
        args={[0.1, 10, renderTarget]}
      />
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
        <sphereGeometry args={[1.3, 36, 36]} />
        <shaderMaterial
          attach="material"
          {...glowMatRef.current}
          side={BackSide}
          transparent
          // depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default ThreePlanetsSun;
