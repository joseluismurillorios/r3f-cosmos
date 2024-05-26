import { forwardRef, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  Noise,
} from '@react-three/postprocessing';
import { folder, useControls } from 'leva';
import { BlendFunction } from 'postprocessing';
import { StoreType } from 'leva/dist/declarations/src/types';

import useDownloadLeva from '@/hooks/useDownloadLeva';

const postConfig = {
  bloomActive: { value: true },
  luminanceThreshold: { value: 0.19, min: 0, max: 1 },
  luminanceSmoothing: { value: 0.13, min: 0, max: 1 },
  intensity: { value: 0.92, min: 0, max: 50, step: 0.001 },
  radius: { value: 1, min: 0, max: 2, step: 0.001 },
};

type EffectsPlanetsProps = {
  onRender(): void;
  store: StoreType;
  postActive: boolean;
  setPostActive(e: boolean): void;
  config?: Partial<typeof postConfig>;
};

const EffectsPlanets = forwardRef<any, EffectsPlanetsProps>(
  ({ onRender, store, postActive, setPostActive, config }, postRef) => {
    const bloomRef = useRef<any>(null);
    const { gl, scene, camera } = useThree();

    const levaConfig = { ...postConfig, ...config };

    const postOptions = useControls(
      {
        POST: folder(
          {
            active: {
              value: postActive,
              onChange: (v: boolean) => setPostActive(v),
            },
            // depthBuffer: true,
            multisampling: { value: 0, min: 0, max: 10, step: 1 },
            brightness: {
              min: -1,
              max: 1,
              value: -0.2,
            },
            contrast: {
              min: -1,
              max: 1,
              value: 0,
            },
            NOISE: folder(
              {
                noiseActive: true,
                premultiply: false,
                opacity: { value: 0.13, min: 0, max: 1, step: 0.001 },
              },
              { collapsed: true, render: (get) => get('POST.active') }
            ),
            BLOOM: folder(
              {
                bloomActive: levaConfig.bloomActive,
                mipmapBlur: { value: true },
                luminanceThreshold: levaConfig.luminanceThreshold,
                luminanceSmoothing: levaConfig.luminanceSmoothing,
                intensity: levaConfig.intensity,
                radius: levaConfig.radius,
              },
              { collapsed: true, render: (get) => get('POST.active') }
            ),
          },
          { collapsed: true }
        ),
      },
      { store }
    );

    useDownloadLeva({
      gl,
      scene,
      camera,
      postActive,
      postRef,
      store,
      cb: onRender,
    });

    useEffect(() => {
      onRender();
    }, [postOptions, onRender]);

    // console.log(bloomRef.current);

    return postActive ? (
      <EffectComposer
        // depthBuffer={postOptions.depthBuffer}
        multisampling={postOptions.multisampling}
        ref={postRef}
        enabled={postActive}
      >
        <Bloom
          luminanceThreshold={postOptions.luminanceThreshold}
          luminanceSmoothing={postOptions.luminanceSmoothing}
          intensity={postOptions.intensity}
          radius={postOptions.radius}
          mipmapBlur={postOptions.mipmapBlur}
          blendFunction={postOptions.bloomActive ? undefined : BlendFunction.SKIP}
          ref={bloomRef}
        />
        <Noise
          opacity={postOptions.opacity}
          premultiply={postOptions.premultiply}
          blendFunction={postOptions.noiseActive ? undefined : BlendFunction.SKIP}
        />
        <BrightnessContrast
          brightness={postOptions.brightness}
          contrast={postOptions.contrast}
        />
      </EffectComposer>
    ) : null;
  }
);

export default EffectsPlanets;
