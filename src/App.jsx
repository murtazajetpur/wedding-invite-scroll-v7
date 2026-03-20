import React, { useState, useEffect, useRef } from 'react';
import HeroReveal from './components/sections/HeroReveal';
import SectionCouple from './components/sections/SectionCouple';
import SectionEvents from './components/sections/SectionEvents';
import SectionStory from './components/sections/SectionStory';
import RSVPFlow from './components/sections/RSVPFlow';
import FinalCarousel from './components/sections/FinalCarousel';
import { preloadAssets } from './utils/preloader';

function App() {
    const [heroState, setHeroState] = useState('Waiting'); // Waiting, Playing, heroStarted, heroDone
    const [activeBg, setActiveBg] = useState('/first section.png');
    const [audioPlaying, setAudioPlaying] = useState(false);
    const canvasRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (heroState === 'heroStarted') {
            preloadAssets();
        }
    }, [heroState]);

    const handleReveal = () => {
        setHeroState('Playing');
    };

    const handleHeroStarted = () => {
        setHeroState('heroStarted');
    };

    const handleHeroDone = () => {
        setHeroState('heroDone');
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (audioPlaying) {
                audioRef.current.pause();
                setAudioPlaying(false);
            } else {
                audioRef.current.play();
                setAudioPlaying(true);
            }
        }
    };

    const playAudioWithFade = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0;
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setAudioPlaying(true);
                    let vol = 0;
                    const fadeInterval = setInterval(() => {
                        if (vol < 1) {
                            vol += 0.05;
                            if (audioRef.current) audioRef.current.volume = Math.min(vol, 1);
                        } else {
                            clearInterval(fadeInterval);
                        }
                    }, 150);
                }).catch(() => {
                    // Silently fail audio if user hasn't interacted enough for the browser
                });
            }
        }
    };

    const sections = [
        { id: 'couple', type: 'couple', title: 'Ayaan & Sara', bg: '/first section.png', theme: 'light' },
        { id: 'story', type: 'story' },
        { 
            id: 'haldi', 
            type: 'event', 
            title: 'Haldi', 
            date: 'Friday, 12 December', 
            time: '10:00 AM', 
            isoDate: '2026-12-12T10:00:00',
            venue: 'Sunset Courtyard', 
            city: 'Mumbai', 
            bg: '/haldi.png', 
            theme: 'light',
            googleMapsUrl: 'https://goo.gl/maps/example-haldi'
        },
        { 
            id: 'mehendi', 
            type: 'event', 
            title: 'Mehendi', 
            date: 'Friday, 12 December', 
            time: '4:00 PM', 
            isoDate: '2026-12-12T16:00:00',
            venue: 'Royal Garden Lawn', 
            city: 'Mumbai', 
            bg: '/mehendi.png', 
            theme: 'light',
            googleMapsUrl: 'https://goo.gl/maps/example-mehendi'
        },
        { 
            id: 'sangeet', 
            type: 'event', 
            title: 'Sangeet', 
            date: 'Saturday, 13 December', 
            time: '8:00 PM', 
            isoDate: '2026-12-13T20:00:00',
            venue: 'Skyline Terrace', 
            city: 'Mumbai', 
            bg: '/sangeet.png', 
            theme: 'dark',
            googleMapsUrl: 'https://goo.gl/maps/example-sangeet'
        },
        { 
            id: 'wedding', 
            type: 'event', 
            title: 'Wedding', 
            date: 'Sunday, 14 December', 
            time: '5:30 PM', 
            isoDate: '2026-12-14T17:30:00',
            venue: 'Seaside Pavilion', 
            city: 'Goa', 
            bg: '/shaadi.png', 
            theme: 'light',
            googleMapsUrl: 'https://goo.gl/maps/example-wedding'
        },
        { 
            id: 'reception', 
            type: 'event', 
            title: 'Reception', 
            date: 'Sunday, 14 December', 
            time: '8:30 PM', 
            isoDate: '2026-12-14T20:30:00',
            venue: 'Ocean Ballroom', 
            city: 'Goa', 
            bg: '/reception.png', 
            theme: 'light',
            googleMapsUrl: 'https://goo.gl/maps/example-reception'
        },
        { id: 'rsvp', type: 'rsvp', bg: '/background.png' },
        { id: 'final', type: 'final', bg: '/background.png' }
    ];

    const handleScroll = () => {
        if (!canvasRef.current) return;
        const scrollPos = canvasRef.current.scrollTop;
        const vh = window.innerHeight;
        const index = Math.round(scrollPos / vh);
        if (sections[index] && sections[index].bg) {
            setActiveBg(sections[index].bg);
        }
    };

    return (
        <div className="app-container">
            <div
                className="blurred-backdrop"
                style={{ backgroundImage: `url("${activeBg}")` }}
            />

            {/* Global Audio Toggle */}
            <button className="audio-toggle-btn" onClick={toggleAudio}>
                {audioPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21" />
                    </svg>
                )}
            </button>

            {/* Global Audio Element */}
            <audio ref={audioRef} loop>
                <source src="/din-shangda-audio.mp3" type="audio/mp3" />
            </audio>

            <div className="phone-canvas-wrapper" style={{ position: 'relative' }}>
                {/* Main Content (Mounted immediately under the hero) */}
                <div
                    className="phone-canvas"
                    ref={canvasRef}
                    onScroll={handleScroll}
                    style={{ 
                        opacity: heroState === 'heroDone' || heroState === 'heroStarted' || heroState === 'Playing' ? 1 : 0,
                        transition: 'opacity 1s ease-in'
                    }}
                >
                    {sections.map((section, idx) => {
                        const isHeroDone = heroState === 'heroDone';
                        if (section.type === 'couple') {
                            return <SectionCouple key={section.id} data={section} isHeroDone={isHeroDone} />;
                        }
                        if (section.type === 'story') {
                            return <SectionStory key={section.id} isHeroDone={isHeroDone} />;
                        }
                        if (section.type === 'event') {
                            return <SectionEvents key={section.id} data={section} isHeroDone={isHeroDone} />;
                        }
                        if (section.type === 'rsvp') {
                            return <RSVPFlow key={section.id} isHeroDone={isHeroDone} />;
                        }
                        if (section.type === 'final') {
                            return <FinalCarousel key={section.id} isHeroDone={isHeroDone} />;
                        }
                        return null;
                    })}
                </div>

                {/* Hero Overlay */}
                {heroState !== 'heroDone' && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1000
                    }}>
                        <HeroReveal
                            onReveal={handleReveal}
                            onStarted={handleHeroStarted}
                            onDone={handleHeroDone}
                            onPlayAudio={playAudioWithFade}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
