import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import { useTransition } from '@react-spring/core';
import { LinearEncoding, LinearToneMapping } from 'three';
import { useControls, useCreateStore } from 'leva';

import Nav from './plantes-nav';
import { CameraOrbitControls } from '@/fibers/controls/orbit-controls';
import Configs from '@/components/organisms/configs';

import './style.scss';
import Planets, { useHashLocation } from './planets';

function Loader({ progress }: { progress: number }) {
  return (
    <Html center style={{ fontSize: 24 }}>
      {progress.toFixed(2)}%
    </Html>
  );
}

export default function App() {
  // Current route
  const [location] = useHashLocation();
  console.log('location', location);
  const store = useRef(useCreateStore()).current;
  const transition = useTransition(location, {
    from: {
      rotation: [0, Math.PI, 0],
      scale: [0, 0, 0],
      opacity: 0,
    },
    enter: {
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      opacity: 1,
    },
    leave: {
      rotation: [0, -Math.PI, 0],
      scale: [0, 0, 0],
      opacity: 0,
    },
    // config: () => (n) => n === 'opacity' && { friction: 60 },
  });
  const { progress } = useProgress();

  const { animate } = useControls(
    {
      animate: true,
    },
    { store }
  );
  return (
    <>
      <Canvas
        // concurrent
        camera={{ position: [0, 0, 5], fov: 27, near: 0.01 }}
        onCreated={({ gl }) => {
          console.log('gl', gl);
        }}
        gl={{
          toneMapping: LinearToneMapping,
          outputEncoding: LinearEncoding,
          antialias: true,
        }}
        frameloop={animate ? 'always' : 'never'}
      >
        <Suspense fallback={<Loader progress={progress} />}>
          <Planets transition={transition} store={store} animate={animate} />
          <hemisphereLight intensity={1.5} />
        </Suspense>
        <CameraOrbitControls
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI / 3) * 2}
          rotateSpeed={0.4}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          enabled={animate}
        />
      </Canvas>
      <Nav />
      <Configs levaStore={store} />
      {/* <Loader /> */}
    </>
  );
}
