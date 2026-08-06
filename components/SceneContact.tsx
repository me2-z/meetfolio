'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars, Html, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ScrollCamera } from './ScrollCamera';
import { Starfield } from './Starfield';

interface SceneContactProps {
  scrollProgress: number;
}

export function SceneContact({ scrollProgress }: SceneContactProps) {
  const towerRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 30, 50),
      new THREE.Vector3(15, 20, 30),
      new THREE.Vector3(25, 10, 15),
      new THREE.Vector3(30, 5, 5),
      new THREE.Vector3(35, 0, 0),
    ]);
  }, []);

  useFrame((state, delta) => {
    if (towerRef.current) {
      towerRef.current.rotation.y += delta * 0.01;
    }
    if (pulseRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <Stars radius={200} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Starfield count={2000} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 20, 0]} intensity={1.5} color={0xff6b6b} distance={60} />
      
      <group ref={towerRef} position={[0, 0, 0]}>
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={[0, 8, 0]}>
            <coneGeometry args={[2, 16, 32]} />
            <meshStandardMaterial color={0xff6b6b} metalness={0.9} roughness={0.1} emissive={0xff6b6b} emissiveIntensity={0.3} />
          </mesh>
          
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1, 2, 16, 32]} />
            <meshStandardMaterial color={0x6366f1} metalness={0.8} roughness={0.2} />
          </mesh>
          
          <mesh ref={pulseRef} position={[0, 16, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color={0xff6b6b} transparent opacity={0.6} />
          </mesh>
          
          <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[3, 3.5, 32]} />
            <meshStandardMaterial color={0x4ecdc4} metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
        </Float>
      </group>
      
      <Html position={[0, 20, 0]} center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white',
          maxWidth: '350px',
          border: '2px solid #ff6b6b',
        }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', textAlign: 'center' }}>Contact</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="email" 
              placeholder="your@email.com" 
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #444',
                background: '#222',
                color: 'white',
                fontSize: '14px',
              }}
            />
            <textarea 
              placeholder="Your message..." 
              rows={4}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #444',
                background: '#222',
                color: 'white',
                fontSize: '14px',
                resize: 'vertical',
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: 'none',
                background: '#ff6b6b',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Send Signal
            </button>
          </form>
        </div>
      </Html>
      
      <ScrollCamera curve={curve} scrollProgress={scrollProgress} />
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.8} intensity={1.2} />
      </EffectComposer>
    </>
  );
}
