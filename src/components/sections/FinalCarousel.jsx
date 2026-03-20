import React, { useState, useEffect } from 'react';

const FinalCarousel = () => {
    const [index, setIndex] = useState(0);
    const images = ['/carousel1.png', '/carousel2.png', '/carousel3.png'];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="section" style={{ justifyContent: 'center' }}>
            <img src="/background.png" className="section-bg" alt="Final Background" />
            <div className="section-overlay" style={{ background: 'rgba(255, 255, 255, 0.3)' }} />
            <div className="section-content visible" style={{ marginTop: 0, maxWidth: '85%' }}>
                <h1 className="display-font" style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#c09858', letterSpacing: '0.08em', textShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>With Love</h1>

                {/* Premium Memory Frame */}
                <div className="memory-frame-outer">
                    <div className="memory-frame-inner">
                        <div className="carousel-container">
                            {images.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    className={`carousel-img ${i === index ? 'active' : ''}`}
                                    alt={`Memory ${i + 1}`}
                                />
                            ))}
                        </div>
                        {/* Soft Vignette Overlay */}
                        <div className="frame-overlay" />
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h1 className="display-font" style={{ fontSize: '2.4rem', fontWeight: 500, color: '#1a1a1a', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>Ayaan</h1>
                    <span className="ampersand" style={{ fontSize: '1.8rem', margin: '-0.5rem 0', color: '#8a6e38', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>&</span>
                    <h1 className="display-font" style={{ fontSize: '2.4rem', fontWeight: 500, color: '#1a1a1a', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>Sara</h1>
                </div>
            </div>

            <style jsx>{`
        .memory-frame-outer {
          position: relative;
          width: 240px;
          height: 320px;
          margin: 0 auto;
          padding: 10px;
          border-radius: 140px 140px 16px 16px;
          background: rgba(255, 255, 255, 0.6);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12), inset 0 0 15px rgba(255,255,255,1);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .memory-frame-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 130px 130px 6px 6px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.5);
        }
        .carousel-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: #fdfaf5;
        }
        .carousel-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 2s ease-in-out;
          filter: sepia(0.3) contrast(1.05) brightness(0.95);
        }
        .carousel-img.active {
          opacity: 1;
        }
        .frame-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          box-shadow: inset 0 0 50px rgba(0,0,0,0.3);
          background: radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(138, 110, 56, 0.15) 100%);
        }
      `}</style>
        </div>
    );
};

export default FinalCarousel;
