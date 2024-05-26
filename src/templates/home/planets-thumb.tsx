import { useTexture } from '@react-three/drei';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

type PlanetsThumbProps = { img: string } & ThreeElements['group'];

function PlanetsThumb({ img, ...props }: PlanetsThumbProps) {
  const sphereRef = useRef<any>();
  const texture = useTexture(img);

  useFrame(() => {
    sphereRef.current.rotation.y += 0.005;
  });
  return (
    <group {...props}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 36, 36]} />
        <meshStandardMaterial map={texture as any} />
      </mesh>
    </group>
  );
}

export default PlanetsThumb;
