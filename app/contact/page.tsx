'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { SceneContainer } from '../../components/SceneContainer';

export default function ContactPage() {
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
        <SceneContainer route="/contact" scrollProgress={scrollProgress} />
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '100px',
        paddingBottom: '50px',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '120px 24px 50px',
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.85)',
          padding: '40px',
          borderRadius: '16px',
          border: '2px solid #ff6b6b',
          backdropFilter: 'blur(10px)',
        }}>
          <h1 style={{ 
            fontSize: '48px', 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #ff6b6b, #f7b731)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
          }}>
            Get In Touch
          </h1>
          
          <p style={{ 
            fontSize: '18px', 
            lineHeight: 1.8, 
            color: '#ccc',
            marginBottom: '30px',
            textAlign: 'center',
          }}>
            Ready to start your next project? Send a signal and let's explore the 
            possibilities together!
          </p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Name</label>
              <input 
                type="text" 
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #444',
                  background: '#222',
                  color: 'white',
                  fontSize: '16px',
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Email</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #444',
                  background: '#222',
                  color: 'white',
                  fontSize: '16px',
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Message</label>
              <textarea 
                placeholder="Tell me about your project..." 
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #444',
                  background: '#222',
                  color: 'white',
                  fontSize: '16px',
                  resize: 'vertical',
                }}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #ff6b6b, #f7b731)',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
            >
              Send Signal 🚀
            </button>
          </form>
          
          <div style={{
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}>
            <p style={{ color: '#aaa', marginBottom: '16px' }}>Or reach out directly:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>GitHub</a>
              <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>LinkedIn</a>
              <a href="#" style={{ color: '#6366f1', textDecoration: 'none' }}>Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
