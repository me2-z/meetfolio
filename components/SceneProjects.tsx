'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { Stars, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ScrollCamera } from './ScrollCamera';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { projects } from '../data/projects';

interface SceneProjectsProps {
  scrollProgress: number;
  onProjectClick: (slug: string) => void;
}

export function SceneProjects({ scrollProgress, onProjectClick }: SceneProjectsProps) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 10, 30),
      new THREE.Vector3(15, 5, 20),
      new THREE.Vector3(25, 0, 10),
      new THREE.Vector3(30, -5, 0),
      new THREE.Vector3(35, 0, -10),
    ]);
  }, []);

  const planetPositions = useMemo(() => {
    return projects.map((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2;
      const radius = 15;
      return {
        ...project,
        position: [
          Math.cos(angle) * radius,
          (index - projects.length / 2) * 4,
          Math.sin(angle) * radius,
        ] as [number, number, number],
      };
    });
  }, []);

  return (
    <>
      <Stars radius={200} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <Starfield count={3000} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 20, 0]} intensity={1} color={0xffffff} distance={100} />
      
      {planetPositions.map((project) => (
        <group key={project.slug}>
          <Planet
            position={project.position}
            scale={1.2}
            color={project.color}
            planetType={project.planetType}
            hasRings={project.hasRings}
            onClick={() => onProjectClick(project.slug)}
            name={project.title}
          />
          <Html position={[project.position[0], project.position[1] + 2.5, project.position[2]]} center>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              padding: '8px 16px',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              border: `2px solid ${project.color}`,
            }}>
              {project.title}
            </div>
          </Html>
        </group>
      ))}
      
      <ScrollCamera curve={curve} scrollProgress={scrollProgress} />
      
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.9} intensity={1} />
      </EffectComposer>
    </>
  );
}
