'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface ScrollCameraProps {
  curve: THREE.CatmullRomCurve3;
  scrollProgress: number;
}

export function ScrollCamera({ curve, scrollProgress }: ScrollCameraProps) {
  const { camera } = useThree();
  const currentProgress = useRef(scrollProgress);
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    currentProgress.current = scrollProgress;
  }, [scrollProgress]);

  useFrame((state, delta) => {
    const progress = THREE.MathUtils.lerp(
      currentProgress.current,
      scrollProgress,
      delta * 2
    );
    
    const position = curve.getPointAt(progress);
    const tangent = curve.getTangentAt(progress);
    
    camera.position.copy(position);
    
    const nextPosition = curve.getPointAt(Math.min(progress + 0.01, 1));
    lookAtTarget.current.copy(nextPosition);
    
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}
