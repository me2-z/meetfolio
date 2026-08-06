'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import { PerformanceMonitor } from '@react-three/drei';
import { useAppStore } from '../store/useAppStore';
import { detectQualityTier } from '../lib/utils';
import { SceneHome } from './SceneHome';
import { SceneProjects } from './SceneProjects';
import { SceneAbout } from './SceneAbout';
import { SceneContact } from './SceneContact';
import { PortalTransition } from './PortalTransition';
import { useRouter } from 'next/navigation';

interface SceneContainerProps {
  route: string;
  scrollProgress: number;
}

function LoadingFallback() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '18px',
    }}>
      Loading...
    </div>
  );
}

export function SceneContainer({ route, scrollProgress }: SceneContainerProps) {
  const router = useRouter();
  const qualityTier = useAppStore((state) => state.qualityTier);
  const setQualityTier = useAppStore((state) => state.setQualityTier);
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'in' | 'out'>('out');

  useEffect(() => {
    detectQualityTier().then(setQualityTier);
  }, [setQualityTier]);

  const handleProjectClick = (slug: string) => {
    setIsTransitionActive(true);
    setTransitionDirection('in');
    
    setTimeout(() => {
      router.push(`/projects/${slug}`);
    }, 500);
  };

  const renderScene = () => {
    switch (route) {
      case '/':
        return <SceneHome scrollProgress={scrollProgress} />;
      case '/projects':
        return <SceneProjects scrollProgress={scrollProgress} onProjectClick={handleProjectClick} />;
      case '/about':
        return <SceneAbout scrollProgress={scrollProgress} />;
      case '/contact':
        return <SceneContact scrollProgress={scrollProgress} />;
      default:
        return <SceneHome scrollProgress={scrollProgress} />;
    }
  };

  return (
    <>
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#000008' }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor
            onIncline={() => {
              if (qualityTier === 'low') setQualityTier('medium');
            }}
            onDecline={() => {
              if (qualityTier === 'high') setQualityTier('medium');
              else if (qualityTier === 'medium') setQualityTier('low');
            }}
          />
          {renderScene()}
        </Suspense>
      </Canvas>
      
      <PortalTransition isActive={isTransitionActive} direction={transitionDirection} />
    </>
  );
}
