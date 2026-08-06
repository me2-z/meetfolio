'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial } from '@react-three/drei';

interface PlanetProps {
  position?: [number, number, number];
  scale?: number;
  color: string;
  planetType: 'terrestrial' | 'gas-giant' | 'ice-giant';
  hasRings: boolean;
  onClick?: () => void;
  name?: string;
}

export function Planet({ 
  position = [0, 0, 0], 
  scale = 1, 
  color, 
  planetType, 
  hasRings, 
  onClick,
  name 
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  
  const distortConfig = useMemo(() => {
    switch (planetType) {
      case 'gas-giant':
        return { distort: 0.4, speed: 2, roughness: 0.8 };
      case 'ice-giant':
        return { distort: 0.2, speed: 1.5, roughness: 0.3 };
      default:
        return { distort: 0.1, speed: 1, roughness: 0.9 };
    }
  }, [planetType]);

  const planetColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} scale={[scale, scale, scale]}>
        <mesh ref={meshRef} onClick={onClick}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={planetColor}
            {...distortConfig}
          />
        </mesh>
        
        {hasRings && (
          <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.4, 2.2, 64]} />
            <meshStandardMaterial
              color={planetColor}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
        {name && (
          <mesh position={[0, -2, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={planetColor} />
          </mesh>
        )}
      </group>
    </Float>
  );
}
