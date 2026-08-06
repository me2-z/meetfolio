'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
      pointerEvents: 'none',
    }}>
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: 'white',
        pointerEvents: 'auto',
        cursor: 'pointer',
      }} onClick={() => router.push('/')}>
        AstroPortfolio
      </div>
      
      <div className="desktop-nav" style={{
        display: 'flex',
        gap: '32px',
        pointerEvents: 'auto',
      }}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className="nav-item"
            onClick={() => handleNavClick(item.path)}
            style={{
              background: 'none',
              border: 'none',
              color: pathname === item.path ? '#6366f1' : 'white',
              fontSize: '16px',
              fontWeight: pathname === item.path ? 'bold' : 'normal',
              cursor: 'pointer',
              position: 'relative',
              paddingBottom: '4px',
            }}
          >
            {item.label}
            {pathname === item.path && (
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                right: 0,
                height: '2px',
                background: '#6366f1',
                borderRadius: '1px',
              }} />
            )}
          </button>
        ))}
      </div>
      
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
      >
        ☰
      </button>
      
      {isMenuOpen && (
        <div className="mobile-menu" style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '250px',
          background: 'rgba(0, 0, 0, 0.95)',
          padding: '80px 24px 24px',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              style={{
                background: 'none',
                border: 'none',
                color: pathname === item.path ? '#6366f1' : 'white',
                fontSize: '20px',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
