'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars, Html, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ScrollCamera } from './ScrollCamera';
import { Starfield } from './Starfield';

interface SceneAboutProps {
  scrollProgress: number;
}

export function SceneAbout({ scrollProgress }: SceneAboutProps) {
  const stationRef = useRef<THREE.Group>(null);
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 20, 40),
      new THREE.Vector3(10, 10, 25),
      new THREE.Vector3(15, 5, 15),
      new THREE.Vector3(20, 0, 5),
      new THREE.Vector3(25, -2, 0),
    ]);
  }, []);

  useFrame((state, delta) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <>
      <Stars radius={200} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Starfield count={2000} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color={0x87ceeb} distance={50} />
      
      <group ref={stationRef} position={[0, 0, 0]}>
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[3, 3, 8, 32]} />
            <meshStandardMaterial color={0x6366f1} metalness={0.8} roughness={0.2} />
          </mesh>
          
          <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[5, 5, 1, 32]} />
            <meshStandardMaterial color={0x4ecdc4} metalness={0.8} roughness={0.2} />
          </mesh>
          
          <mesh position={[4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[6, 1, 1]} />
            <meshStandardMaterial color={0xa55eea} metalness={0.6} roughness={0.3} />
          </mesh>
          
          <mesh position={[-4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[6, 1, 1]} />
            <meshStandardMaterial color={0xa55eea} metalness={0.6} roughness={0.3} />
          </mesh>
        </Float>
      </group>
      
      <Html position={[0, 8, 0]} center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '20px',
          borderRadius: '12px',
          color: 'white',
          maxWidth: '400px',
          textAlign: 'center',
          border: '2px solid #6366f1',
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>About Me</h2>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            I am a passionate developer and astronomy enthusiast, creating interactive 
            experiences that blend technology with the wonders of the cosmos.
          </p>
        </div>
      </Html>
      
      <ScrollCamera curve={curve} scrollProgress={scrollProgress} />
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.9} intensity={0.8} />
      </EffectComposer>
    </>
  );
}
