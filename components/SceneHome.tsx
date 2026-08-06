'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ScrollCamera } from './ScrollCamera';
import { Planet } from './Planet';
import { Starfield } from './Starfield';

interface SceneHomeProps {
  scrollProgress: number;
}

export function SceneHome({ scrollProgress }: SceneHomeProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 5, 20),
      new THREE.Vector3(10, 2, 15),
      new THREE.Vector3(15, -5, 10),
      new THREE.Vector3(20, 0, 0),
      new THREE.Vector3(25, 5, -10),
    ]);
  }, []);

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <Stars radius={200} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Starfield count={3000} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color={0xffaa00} distance={100} />
      
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial color={0xffaa00} />
      </mesh>
      
      <Sparkles count={200} scale={50} size={2} speed={0.4} opacity={0.5} color="#ffaa00" position={[0, 0, 0]} />
      
      <Planet position={[8, 2, 5]} scale={0.8} color="#ff6b6b" planetType="terrestrial" hasRings={false} />
      <Planet position={[12, -3, -2]} scale={1.2} color="#4ecdc4" planetType="gas-giant" hasRings={true} />
      <Planet position={[18, 1, -8]} scale={0.6} color="#a55eea" planetType="ice-giant" hasRings={true} />
      
      <ScrollCamera curve={curve} scrollProgress={scrollProgress} />
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.9} intensity={1.5} />
      </EffectComposer>
    </>
  );
}
