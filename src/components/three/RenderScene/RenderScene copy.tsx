"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Color,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  Mesh,
  ShaderMaterial,
} from "three";
import { vertex } from "../shaders/vertex";
import { fragment } from "../shaders/fragment";
import { fragmentWire } from "../shaders/fragmentWire";
import { OrbitControls, StatsGl, useAspect } from "@react-three/drei";

export default function RenderScene() {
  return (
    <section
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Canvas>
        <CustomMesh w={false} c={new Color(0.25, 0.15, 0.85)} r={1} />
        <OrbitControls />
        <pointLight
          position={[0, 0.5, 1]}
          color="rgb(126,73,142)"
          decay={0.5}
          intensity={0.75}
        />
        <StatsGl />
      </Canvas>
    </section>
  );
}

function SceneLight() {
  const scale = useAspect(window.innerWidth, window.innerHeight);

  return (
    <mesh scale={[...scale]} position={[0, 0, -2]}>
      <planeGeometry args={[10, 10, 1]} />
      <meshPhongMaterial />
    </mesh>
  );
}

function CustomMesh({ w, c, r }: { w: boolean; c: Color; r: number }) {
  const matRef = useRef<ShaderMaterial>(null);
  const meshRef = useRef<Mesh>(null);
  const grpRef = useRef<Group>(null);

  const dataShader = useMemo(
    () => ({
      uniforms: {
        uTime: { type: "f", value: 0 },
        uFrame: { type: "f", value: 0 },
        uColor: { type: "v3", value: c },
      },
      vertex: vertex,
      fragment: fragment,
    }),
    [c]
  );
  const dataFrag = useMemo(
    () => ({
      fragment: fragmentWire,
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!matRef.current || !grpRef.current)
      return console.error("mat not found");
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    grpRef.current.rotation.y = -0.85;
  });
  const ico = new IcosahedronGeometry(1.75, 16);
  const edges = new EdgesGeometry(ico);
  return (
    <group ref={grpRef}>
      <mesh>
        <icosahedronGeometry args={[1.75, 32]} />
        <shaderMaterial
          ref={matRef}
          attach="material"
          uniforms={dataShader.uniforms}
          vertexShader={dataShader.vertex}
          fragmentShader={dataShader.fragment}
        />
      </mesh>
      <mesh ref={meshRef} scale={1.01}>
        <icosahedronGeometry args={[1.75, 64]} />
        {/* <sphereGeometry args={[2, 64]} /> */}
        <shaderMaterial
          ref={matRef}
          attach="material"
          uniforms={dataShader.uniforms}
          vertexShader={dataShader.vertex}
          fragmentShader={dataFrag.fragment}
          wireframe={true}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

function CustomPoints() {
  const ico = new IcosahedronGeometry(1.75, 16);
  const edges = new EdgesGeometry(ico);
  return (
    <mesh>
      <icosahedronGeometry args={[2, 4]} />
      {/* <edgesGeometry attributes={[]}/> */}
    </mesh>
  );
}
