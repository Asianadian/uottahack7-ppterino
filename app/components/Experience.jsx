import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Pizza } from "./Pizza";

export const Experience = () => {
  const pizzaRef = useRef();

  // Rotate the pizza in each frame
  useFrame(() => {
    if (pizzaRef.current) {
      pizzaRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
    }
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={6} />
      <group ref={pizzaRef}>
        <Pizza />
      </group>
    </>
  );
};
