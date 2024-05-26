import { useEffect, useMemo, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { TransitionFn } from '@react-spring/core';
import { a } from '@react-spring/three';
import { Switch, Route } from 'wouter';
import { Color } from 'three';
import { folder, useControls } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';

import ThreePlanetsMoon from '@/templates/home/solar-system/planets/three-moon';
import { solarSystemPlanets } from '@/templates/home/solar-system';
import ThreePlanetsAtm from '@/templates/home/solar-system/three-planet-atm';
import { throttle } from '@/helpers/helper-util';
import EffectsPlanets from '@/fibers/effects/effects-planets';

interface PlanetsProps {
  transition: TransitionFn<string, any>;
  store: StoreType;
  animate?: boolean;
}

export default function Planets({ transition, store, animate }: PlanetsProps) {
  const postRef = useRef<any>();
  // const store = useRef(useCreateStore()).current;
  const [postActive, setPostActive] = useState(true);
  const animateRef = useRef(animate);
  const { gl, scene, camera } = useThree();

  const renderTargetNode = () => {
    if (!animateRef.current) {
      gl?.render(scene, camera);
      postRef.current?.setSize(window.innerWidth, window.innerHeight);
      postRef.current?.render();
    }
  };
  // const mainColor = useRef(new Color('#121212'));

  const col = useRef(new Color('#121212'));
  const postOptions = useControls(
    {
      PLANET: folder(
        {
          bg: {
            value: '#121212',
          },
        },
        { collapsed: true }
      ),
    },
    { store }
  );

  const onRender = useRef(() => {
    renderTargetNode();
  }).current;

  const delayedRender = useRef(throttle(onRender, 100)).current;

  const mainColor = useMemo(() => {
    const val = col.current.set(postOptions.bg).convertLinearToSRGB();
    delayedRender();
    return val;
  }, [postOptions.bg, delayedRender]);

  useEffect(() => {
    animateRef.current = animate;
    delayedRender();
  }, [animate, delayedRender]);

  useEffect(() => {
    window.addEventListener('resize', delayedRender);
    return () => {
      window.removeEventListener('resize', delayedRender);
    };
  }, []);

  return (
    <>
      <color attach="background" args={[mainColor.getHex()]} />
      {transition(({ opacity, ...props }, location) => (
        <a.group {...props}>
          <Switch location={location}>
            <Route path="/">
              <ThreePlanetsAtm store={store} color={mainColor} />
              <ThreePlanetsMoon />
            </Route>
            {solarSystemPlanets.map(({ id, Planet, atmosphere }) => (
              <Route key={id} path={`/${id}`}>
                {atmosphere && <ThreePlanetsAtm store={store} color={mainColor} />}
                <Planet store={store} onUpdate={delayedRender} />
              </Route>
            ))}
          </Switch>
          <EffectsPlanets
            ref={postRef}
            onRender={delayedRender}
            store={store}
            postActive={postActive}
            setPostActive={setPostActive}
          />
        </a.group>
      ))}
    </>
  );
}
