'use client';

import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uColor: new THREE.Color(0x6366f1),
    uDirection: 1,
  },
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uColor;
    uniform float uDirection;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    #define PI 3.14159265359
    
    void main() {
      vec2 center = vUv - 0.5;
      float dist = length(center);
      float angle = atan(center.y, center.x);
      
      float spiral = sin(dist * 20.0 - uTime * 2.0 + angle * 3.0);
      float rings = sin(dist * 50.0 - uTime * 3.0) * 0.5 + 0.5;
      
      float progress = uProgress;
      float fade = smoothstep(0.0, 0.3, progress) * smoothstep(1.0, 0.7, progress);
      
      float alpha = fade * (spiral * 0.5 + 0.5) * 0.8;
      alpha += fade * rings * 0.3;
      
      vec3 finalColor = uColor + vec3(spiral * 0.2);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

extend({ PortalMaterial });

interface PortalTransitionProps {
  isActive: boolean;
  direction: 'in' | 'out';
  color?: string;
}

export function PortalTransition({ isActive, direction, color = '#6366f1' }: PortalTransitionProps) {
  const materialRef = useRef<any>();
  
  const portalColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      
      const target = isActive ? 1 : 0;
      materialRef.current.uProgress = THREE.MathUtils.lerp(
        materialRef.current.uProgress,
        target,
        delta * 2
      );
      
      materialRef.current.uDirection = direction === 'in' ? 1 : -1;
      materialRef.current.uColor.lerp(portalColor, delta * 0.1);
    }
  });

  return (
    <mesh scale={[100, 100, 1]} position={[0, 0, 5]}>
      <planeGeometry args={[1, 1]} />
      <portalMaterial ref={materialRef} transparent depthWrite={false} />
    </mesh>
  );
}
