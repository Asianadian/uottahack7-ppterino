"use client"; // If using Next.js App Router

import React from "react";
import PepperoniPrompt from "./components/ChatInput";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Cursor } from "./components/Cursor";

export default function HomePage() {
  return (
    <div className="flex flex-row h-screen w-screen">
      {/* Left Section: PepperoniPrompt */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <PepperoniPrompt />
      </div>

      {/* Right Section: 3D Canvas */}
      <div className="w-1/2 relative">
        <Canvas shadows camera={{ position: [0, 8, 5], fov: 10 }}>
          <color attach="background" args={["#ffffff"]} />
          <Experience />
        </Canvas>
      </div>
      <Cursor />
    </div>
  );
}
