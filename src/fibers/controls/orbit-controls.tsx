import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export function CameraOrbitControls({ ...props }) {
  const { camera } = useThree();
  return <OrbitControls camera={camera} {...props} />;
}
