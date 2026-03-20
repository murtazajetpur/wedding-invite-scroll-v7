import React, { useState, useRef, useEffect } from 'react';

const HeroReveal = ({ onReveal, onStarted, onDone, onPlayAudio }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [posterOpacity, setPosterOpacity] = useState(1);
    const [videoOpacity, setVideoOpacity] = useState(1);
    const [mandapOpacity, setMandapOpacity] = useState(0);
    const [showHero, setShowHero] = useState(true);

    const videoRef = useRef(null);
    const timerRef = useRef([]);

    const handleTap = () => {
        if (isRevealed) return;
        setIsRevealed(true);
        setPosterOpacity(0);
        onReveal();

        // Immediate cinematic start
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // If video fails due to low power mode / strict policy, just proceed
            });
        }
        if (onPlayAudio) onPlayAudio();
        onStarted();

        // 3.8s: Mandap fade in (starts earlier for better overlap)
        timerRef.current.push(setTimeout(() => {
            setMandapOpacity(1);
        }, 3800));

        // 5.0s: Video fade out (slower transition)
        timerRef.current.push(setTimeout(() => {
            setVideoOpacity(0);
        }, 5000));

        // 4.5s: Final Hero sequence fade-out starts
        timerRef.current.push(setTimeout(() => {
            setShowHero(false);
        }, 4500));

        // 5.5s: Unmount hero
        timerRef.current.push(setTimeout(() => {
            onDone();
        }, 5500));
    };

    useEffect(() => {
        return () => {
            timerRef.current.forEach(clearTimeout);
        };
    }, []);

    return (
        <div 
            className={`hero-reveal ${!showHero ? 'reveal-fade-out' : ''}`}
            onClick={handleTap}
        >
            {/* Mandap Image Behind Video */}
            <img
                src="/first section.png"
                className="hero-poster"
                style={{
                    opacity: mandapOpacity,
                    transition: 'opacity 1.2s ease-out',
                    zIndex: 10
                }}
                alt="Mandap"
            />

            {/* Hero Video */}
            <video
                ref={videoRef}
                className="hero-video"
                playsInline
                muted={false}
                poster="/Hero Poster.png"
                style={{ opacity: videoOpacity, transition: 'opacity 0.8s ease-out', zIndex: 11 }}
            >
                <source src="/Main Hero Video.mp4" type="video/mp4" />
            </video>

            {/* Poster (visible until tap fades out) */}
            <div 
                className="hero-poster"
                style={{ 
                    zIndex: 12, 
                    opacity: posterOpacity,
                    transition: 'opacity 0.8s ease-out',
                    pointerEvents: isRevealed ? 'none' : 'auto',
                    overflow: 'hidden',
                    background: '#000'
                }}
            >
                <img 
                    src="/Hero Poster.png" 
                    className="hero-poster" 
                    style={{ position: 'absolute' }}
                    alt="Poster" 
                />
                
                {/* Soft Rose festive vignette to make text pop */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(255,182,193,0.1) 0%, rgba(252,228,236,0.4) 100%)',
                    zIndex: 13
                }} />
                
                <div className="hero-overlay-top" style={{ opacity: posterOpacity }}>
                    <div className="hero-invitation">You are cordially invited to the wedding of</div>
                </div>

                <div className="hero-overlay-bottom" style={{ opacity: posterOpacity }}>
                    <div className="hero-names">Ayaan<br/>& Sara</div>
                </div>
            </div>

            {/* CTA Button */}
            <button 
                className="tap-to-reveal" 
                style={{
                    opacity: posterOpacity,
                    pointerEvents: isRevealed ? 'none' : 'auto',
                    zIndex: 100,
                    transition: 'all 0.5s ease-out'
                }}
                onClick={handleTap}
            >
                Tap to Reveal
            </button>
        </div>
    );
};

export default HeroReveal;
