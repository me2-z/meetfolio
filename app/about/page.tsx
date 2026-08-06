'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { SceneContainer } from '../../components/SceneContainer';

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      <Navigation />
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <SceneContainer route="/about" scrollProgress={scrollProgress} />
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '100px',
        paddingBottom: '50px',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '120px 24px 50px',
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.85)',
          padding: '40px',
          borderRadius: '16px',
          border: '2px solid #6366f1',
          backdropFilter: 'blur(10px)',
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #6366f1, #a55eea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            About Me
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            lineHeight: 1.8, 
            color: '#ccc',
            marginBottom: '24px',
          }}>
            Welcome to my cosmic corner of the internet! I am a passionate developer 
            and astronomy enthusiast who believes in creating immersive digital 
            experiences that inspire wonder and curiosity.
          </p>
          
          <p style={{ 
            fontSize: '18px', 
            lineHeight: 1.8, 
            color: '#ccc',
            marginBottom: '24px',
          }}>
            With expertise in modern web technologies and 3D graphics, I specialize 
            in building interactive applications that push the boundaries of what's 
            possible in the browser. This portfolio itself is a testament to that 
            passion—combining React Three Fiber, GSAP, and Next.js to create a 
            scroll-driven journey through space.
          </p>
          
          <div style={{
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Skills & Technologies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['React', 'Next.js', 'Three.js', 'R3F', 'TypeScript', 'Node.js', 'GSAP', 'WebGL'].map((skill) => (
                <span key={skill} style={{
                  background: 'rgba(99, 102, 241, 0.3)',
                  color: '#a5b4fc',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
