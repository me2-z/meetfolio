'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '../components/Navigation';
import { SceneContainer } from '../components/SceneContainer';
import { useAppStore } from '../store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pathname = usePathname();
  const setCurrentRoute = useAppStore((state) => state.setCurrentRoute);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname, setCurrentRoute]);

  useEffect(() => {
    const updateScroll = () => {
      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const scrollHeight = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
        const progress = Math.min(scrollTop / scrollHeight, 1);
        setScrollProgress(progress);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScroll);
      
      gsap.to(container, {
        scrollTo: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScroll);
      }
    };
  }, [pathname]);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Navigation />
      
      <div
        ref={scrollContainerRef}
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div style={{
          width: '100%',
          height: '500vh',
          position: 'relative',
        }} />
      </div>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}>
        <SceneContainer route={pathname} scrollProgress={scrollProgress} />
      </div>
    </div>
  );
}
