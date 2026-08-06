'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navigation } from '../../../components/Navigation';
import { SceneContainer } from '../../../components/SceneContainer';
import { projects } from '../../../data/projects';
import { Html } from '@react-three/drei';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const project = projects.find(p => p.slug === params.slug);

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

  if (!project) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000008',
        color: 'white',
      }}>
        Project not found
      </div>
    );
  }

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
        <SceneContainer route="/projects" scrollProgress={scrollProgress} />
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
        <button
          onClick={() => router.back()}
          style={{
            background: 'rgba(99, 102, 241, 0.8)',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '30px',
            fontSize: '16px',
          }}
        >
          ← Back to Projects
        </button>
        
        <div style={{
          background: 'rgba(0, 0, 0, 0.85)',
          padding: '40px',
          borderRadius: '16px',
          border: `2px solid ${project.color}`,
          backdropFilter: 'blur(10px)',
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            marginBottom: '16px',
            background: `linear-gradient(135deg, ${project.color}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {project.title}
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            lineHeight: 1.8, 
            color: '#ccc',
            marginBottom: '30px',
          }}>
            {project.description}
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <span style={{
              background: `${project.color}33`,
              color: project.color,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>
              {project.planetType.replace('-', ' ').toUpperCase()}
            </span>
            {project.hasRings && (
              <span style={{
                background: '#ffffff33',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
              }}>
                Has Rings
              </span>
            )}
          </div>
          
          <div style={{
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Project Details</h2>
            <p style={{ color: '#aaa', lineHeight: 1.8 }}>
              This project showcases innovative approaches to solving complex problems 
              in the domain of astronomy and space exploration. Built with modern 
              technologies and best practices, it demonstrates both technical 
              proficiency and creative problem-solving abilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
