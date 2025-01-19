import { OrbitControls } from "@react-three/drei";
import {Pizza} from "./Pizza";

export const Experience = () => {
  
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={5} />
      <Pizza />
    </>
  );
};