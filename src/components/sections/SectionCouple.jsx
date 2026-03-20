import React, { useEffect, useRef, useState } from 'react';

const SectionCouple = ({ data, isHeroDone }) => {
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

    const isLightTheme = data.theme === 'light';
    const primaryColor = isLightTheme ? '#2C2C2C' : '#fff';
    const secondaryColor = isLightTheme ? 'rgba(40,40,40,0.9)' : 'rgba(255,255,255,0.95)';
    const textHShadow = isLightTheme ? '0 2px 4px rgba(255,255,255,0.8)' : '0 4px 15px rgba(0,0,0,0.6)';
    const textMShadow = isLightTheme ? '0 1px 3px rgba(255,255,255,0.8)' : '0 2px 8px rgba(0,0,0,0.5)';
    const ampColor = isLightTheme ? '#D4AF37' : '#fff';

    return (
        <div className="section" ref={sectionRef}>
            <img src={data.bg} className="section-bg" alt="Mandap Couple" />
            <div className="section-overlay overlay-couple" />

            <div className={`section-content ${isVisible ? 'visible' : ''}`} style={{ marginTop: '16dvh' }}>
                <h1 className="display-font fade-up-element cascade-1" style={{ fontSize: '3.6rem', color: primaryColor, textShadow: textHShadow }}>Ayaan</h1>
                <span className="ampersand fade-up-element cascade-2" style={{ color: ampColor, textShadow: textMShadow }}>&</span>
                <h1 className="display-font fade-up-element cascade-3" style={{ fontSize: '3.6rem', color: primaryColor, textShadow: textHShadow }}>Sara</h1>
                <h2 className="body-font fade-up-element cascade-4" style={{ marginTop: '2rem', fontWeight: 500, color: secondaryColor, letterSpacing: '0.2em', textShadow: textMShadow, textTransform: 'none' }}>are getting married ❤︎ </h2>
            </div>
        </div>
    );
};

export default SectionCouple;
