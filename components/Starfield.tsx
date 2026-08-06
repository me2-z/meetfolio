'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../store/useAppStore';

interface StarfieldProps {
  count?: number;
}

export function Starfield({ count = 5000 }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const qualityTier = useAppStore((state) => state.qualityTier);
  
  const adjustedCount = useMemo(() => {
    if (qualityTier === 'low') return Math.floor(count * 0.3);
    if (qualityTier === 'medium') return Math.floor(count * 0.6);
    return count;
  }, [count, qualityTier]);

  const { positions, colors } = useMemo(() => {
    const posArray = new Float32Array(adjustedCount * 3);
    const colArray = new Float32Array(adjustedCount * 3);
    
    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xffd700),
      new THREE.Color(0x87ceeb),
      new THREE.Color(0xffa500),
    ];

    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3;
      
      const radius = 100 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i3 + 2] = radius * Math.cos(phi);
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colArray[i3] = color.r;
      colArray[i3 + 1] = color.g;
      colArray[i3 + 2] = color.b;
    }

    return { positions: posArray, colors: colArray };
  }, [adjustedCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
