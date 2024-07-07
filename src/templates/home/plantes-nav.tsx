import { a } from '@react-spring/web';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';

import { useState, Suspense, useEffect, useRef } from 'react';
import ModalPicker from '@/components/atoms/modal-picker';
import { throttle } from '@/helpers/helper-util';
import { solarSystemPlanets } from '@/templates/home/solar-system';
import PlanetsThumb from './planets-thumb';

// TODO: use aspect ratio

const color = new Color('#121212');

const THUMBS_PER_PAGE = 3;
const THUMBS_LENGTH = solarSystemPlanets.length;
const THUMBS_MAX = Math.round(THUMBS_LENGTH / THUMBS_PER_PAGE) - 1;
const THUMB_WIDTH = 92;
const BTNS_WIDTH = 36 * 2;

function paginate<T>(array: T[], page_size: number, page_number: number) {
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

function getThumbsPerPage() {
  return Math.floor(
    Math.min((window.innerWidth - BTNS_WIDTH) / THUMB_WIDTH, THUMBS_PER_PAGE)
  );
}

// function ActiveLink(props: { href: string; children: ReactNode; className: string }) {
//   const [isActive] = useRoute(props.href);
//   return (
//     <Link {...props}>
//       <a href={props.href} className={`${props.className} ${isActive ? 'active' : ''}`}>
//         {props.children}
//       </a>
//     </Link>
//   );
// }

function PlanetsNav() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [tpp, setTpp] = useState(getThumbsPerPage());
  const thumbs = paginate(solarSystemPlanets, tpp, page);
  const onNext = () => {
    setPage((page + 1) * tpp >= THUMBS_LENGTH ? 0 : page + 1);
  };
  const onPrev = () => {
    setPage(page < 1 ? THUMBS_MAX : page - 1);
  };

  const resize = () => {
    setTpp(getThumbsPerPage());
  };

  const delayedResize = useRef(throttle(resize, 1500)).current;

  useEffect(() => {
    window.addEventListener('resize', delayedResize);
    delayedResize();

    return () => {
      window.removeEventListener('resize', delayedResize);
    };
  }, [delayedResize]);

  return (
    <>
      <ul className="app__three--nav">
        <li>
          <button type="button" className="dot" onClick={() => setVisible(!visible)}>
            nav
          </button>
        </li>
        <li>
          <a
            href="https://github.com/josemurillodev/r3f-cosmos"
            className="icon"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github size={16} />
          </a>
        </li>
      </ul>
      <ModalPicker
        className="app__planets--modal"
        toggleModal={() => setVisible(!visible)}
        isVisible={visible}
        hideBackdrop
      >
        <div className="app__three--vis">
          <button onClick={onPrev} type="button" className="app__three--vis-prev">
            <ChevronLeft size={16} />
          </button>
          <a.div className="app__three--vis-thumbs">
            {thumbs.map(({ id, name, thumb }) => (
              <NavLink key={id} to={`#/${id}`} className="app__three--vis-thumb">
                <Canvas linear>
                  <Suspense fallback={null}>
                    <color attach="background" args={[color]} />
                    <hemisphereLight intensity={1.5} />
                    <PlanetsThumb scale={2.5} img={thumb} />
                  </Suspense>
                </Canvas>
                <span>{name}</span>
              </NavLink>
            ))}
          </a.div>
          <button onClick={onNext} type="button" className="app__three--vis-next">
            <ChevronRight size={16} />
          </button>
        </div>
      </ModalPicker>
    </>
  );
}

export default PlanetsNav;
