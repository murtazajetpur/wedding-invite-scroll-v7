import React, { useEffect, useRef, useState } from 'react';

const SectionEvents = ({ data, isHeroDone }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [inView, setInView] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
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
            setShowParticles(true);
        }
    }, [inView, isHeroDone]);

    const renderParticles = () => {
        if (!showParticles) return null;

        if (data.id === 'haldi') {
            return (
                <div className="particles-container">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="particle-haldi" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
                    ))}
                </div>
            );
        }
        if (data.id === 'wedding' || data.id === 'reception' || data.id === 'mehendi') {
            return (
                <div className="particles-container">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="particle-petal" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }} />
                    ))}
                </div>
            );
        }
        if (data.id === 'sangeet') {
            return (
                <div className="particles-container">
                    <div className="glow-stringlights" />
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle-sparkle" style={{ top: `${Math.random() * 50}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
                    ))}
                </div>
            );
        }
        return null;
    };

    const isLightTheme = data.theme === 'light';
    const primaryColor = isLightTheme ? '#2C2C2C' : '#fff';
    const secondaryColor = isLightTheme ? 'rgba(40,40,40,0.9)' : 'rgba(255,255,255,0.95)';
    const textHShadow = isLightTheme ? '0 2px 4px rgba(255,255,255,0.8)' : '0 4px 15px rgba(0,0,0,0.6)';
    const textMShadow = isLightTheme ? '0 1px 3px rgba(255,255,255,0.8)' : '0 2px 8px rgba(0,0,0,0.5)';
    const textSShadow = isLightTheme ? 'none' : '0 2px 6px rgba(0,0,0,0.5)';

    return (
        <div className="section" ref={sectionRef}>
            <img src={data.bg} className="section-bg" alt={data.title} />
            <div className={`section-overlay event-overlay-${data.id}`} />

            {renderParticles()}

            <div className={`section-content ${isVisible ? 'visible' : ''}`} style={{ marginTop: '12dvh', maxWidth: '80%' }}>
                <h1 className="display-font fade-up-element cascade-1" style={{ color: primaryColor, fontSize: '3.4rem', textShadow: textHShadow }}>{data.title}</h1>
                <div style={{ margin: '1.2rem 0' }}>
                    <h2 className="body-font fade-up-element cascade-2" style={{ color: secondaryColor, fontSize: '0.95rem', letterSpacing: '0.2em', textShadow: textMShadow }}>{data.date}</h2>
                    <h2 className="body-font fade-up-element cascade-2" style={{ color: secondaryColor, fontSize: '0.95rem', letterSpacing: '0.2em', marginTop: '0.3rem', textShadow: textMShadow }}>{data.time}</h2>
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                    <h2 className="body-font fade-up-element cascade-3" style={{ fontSize: '0.8rem', color: secondaryColor, textShadow: textSShadow }}>{data.venue}</h2>
                    <h2 className="body-font fade-up-element cascade-4" style={{ fontSize: '0.8rem', color: secondaryColor, textShadow: textSShadow }}>{data.city}</h2>
                </div>

                <div className="event-actions fade-up-element cascade-4" style={{ marginTop: '2rem' }}>
                    <a 
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.title + ' - Ayaan & Sara')}&dates=${data.isoDate.replace(/[-:]/g, '')}Z/${data.isoDate.replace(/[-:]/g, '')}Z&details=${encodeURIComponent('Wedding Celebrations of Ayaan & Sara')}&location=${encodeURIComponent(data.venue + ', ' + data.city)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="event-btn btn-calendar"
                        style={{ color: primaryColor, borderColor: primaryColor }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Add to Calendar
                    </a>
                    <a 
                        href={data.googleMapsUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="event-btn btn-maps"
                        style={{ color: primaryColor, borderColor: primaryColor }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Google Maps
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SectionEvents;
