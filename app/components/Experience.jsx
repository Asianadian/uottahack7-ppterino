import React, { useState, useEffect } from "react";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Pizza } from "./Pizza";

export const Experience = () => {
  const [pizzas, setPizzas] = useState([]);

  // Generate random pizzas with initial properties
  useEffect(() => {
    const generatePizzas = () => {
      const instances = Array.from({ length: 250 }, () => ({
        id: Math.random(),
        position: [
          Math.random() * 20 - 10, // Random x position
          Math.random() * 10 + 0, // Random y position (above the view)
          Math.random() * 10 - 5, // Random z position
        ],
        scale: Math.random() * 0.6 + 0.05, // Random scale between 0.05 and 0.25
        rotation: [
          Math.random() * Math.PI, // Random x rotation
          Math.random() * Math.PI, // Random y rotation
          Math.random() * Math.PI, // Random z rotation
        ],
        speed: Math.random() * 0.02 + 0.01, // Random falling speed
      }));
      setPizzas(instances);
    };

    generatePizzas();
  }, []);

  // Animate pizzas to fall
  useFrame(() => {
    setPizzas((prevPizzas) =>
      prevPizzas.map((pizza) => {
        const newY = pizza.position[1] - pizza.speed;
        return {
          ...pizza,
          position: [
            pizza.position[0],
            newY < -5 ? Math.random() * 10 + 5 : newY, // Reset y when out of view
            pizza.position[2],
          ],
          rotation: [
            pizza.rotation[0] + 0.01,
            pizza.rotation[1] + 0.02,
            pizza.rotation[2] + 0.01,
          ], // Add some rotation for fun
        };
      })
    );
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />

      {/* Pizzas */}
      {pizzas.map((pizza) => (
        <group
          key={pizza.id}
          position={pizza.position}
          rotation={pizza.rotation}
          scale={[pizza.scale, pizza.scale, pizza.scale]}
        >
          <Pizza />
        </group>
      ))}

      <Environment preset="apartment" />
          {/* Add Ppteroni Logo with Html */}
            <Html position={[0, 0, 0]} center>
            <div
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "rgb(254 202 202 / var(--tw-bg-opacity, 1))",
                textAlign: "center",
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                textShadow: "4px 4px 4px rgb(220 38 38 / var(--tw-bg-opacity, 1))",
              }}
            >
              Ppteroni
            </div>
          </Html>
    </>
  );
};
