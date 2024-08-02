"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { Color, Group, Mesh, ShaderMaterial } from "three";
import { vertex } from "../shaders/vertex";
import { fragment } from "../shaders/fragment";
import { fragmentWire } from "../shaders/fragmentWire";
import { OrbitControls, StatsGl, useAspect } from "@react-three/drei";
// style={{
//   position: "absolute",
//   zIndex: -1,
//   top: 0,
//   left: 0,
//   height: "100vh",
//   width: "100%",
// }}
export default function RenderScene() {
  return (
    <section className="canvas">
      <Suspense fallback={<div>Loading</div>}>
        <Canvas>
          <CustomMesh w={false} c={new Color(0.25, 0.15, 0.85)} r={1} />
          <pointLight
            position={[0, 0.5, 1]}
            color="rgb(126,73,142)"
            decay={0.5}
            intensity={0.75}
          />
          {/* <StatsGl /> */}
        </Canvas>
      </Suspense>
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
    grpRef.current.rotation.y = 0.9;
    grpRef.current.rotation.z = 0.35;
  });

  return (
    <group ref={grpRef} scale={1.2}>
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
