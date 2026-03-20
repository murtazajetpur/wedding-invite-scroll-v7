import React, { useEffect, useRef, useState } from 'react';

const SectionStory = ({ isHeroDone }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (inView && isHeroDone) {
            setIsVisible(true);
        }
    }, [inView, isHeroDone]);

    return (
        <div className="section" ref={sectionRef}>
            <img src="/story-bg.png" className="section-bg" alt="Story Background" />
            <div className="section-overlay" style={{ background: 'rgba(255, 255, 255, 0.05)' }} />
            
            <div className={`section-content ${isVisible ? 'visible' : ''}`} style={{ marginTop: '6dvh', padding: '0 2rem' }}>
                <div style={{ marginBottom: '1.2rem' }}>
                    <h2 className="fade-up-element cascade-1" style={{ 
                        fontFamily: "'Cormorant Garamond', serif", 
                        fontSize: '1.2rem', 
                        color: '#5A4636', 
                        letterSpacing: '0.3em', 
                        textTransform: 'uppercase',
                        fontWeight: 500
                    }}>Two Hearts,</h2>
                    <h1 className="script-font fade-up-element cascade-2" style={{ 
                        fontSize: '3.4rem', 
                        color: '#5A4636', 
                        marginTop: '0.3rem',
                        lineHeight: 1.2
                    }}>One Beautiful Story</h1>
                </div>

                <p className="fade-up-element cascade-3" style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.1rem', 
                    color: '#5A4636', 
                    maxWidth: '320px', 
                    margin: '1.2rem auto 0 auto',
                    lineHeight: '1.8',
                    fontWeight: 400,
                    opacity: 0.85,
                    fontStyle: 'italic'
                }}>
                    With love in our hearts and joy in every moment, we invite you to join us in celebrating the beginning of our forever.
                </p>
            </div>
        </div>
    );
};

export default SectionStory;
