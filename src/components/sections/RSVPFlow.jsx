import React, { useState } from 'react';

const RSVPFlow = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        attending: '',
        phone: ''
    });

    const nextStep = () => setStep(step + 1);

    return (
        <div className="section">
            <img src="/background.png" className="section-bg" alt="RSVP Background" />
            <div className="section-overlay" style={{ background: 'rgba(255, 255, 255, 0.4)' }} />
            <div className="rsvp-container" style={{ width: '100%', padding: '0 10%', position: 'relative', zIndex: 3 }}>
                {step === 1 && (
                    <div className="rsvp-step fade-in">
                        <h1 className="display-font" style={{ fontSize: '2.4rem', color: '#c09858', marginBottom: '2rem' }}>May we have your name?</h1>
                        <input
                            type="text"
                            className="rsvp-input"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && formData.name && nextStep()}
                        />
                        <div style={{ marginTop: '1rem', height: '60px' }}>
                            {formData.name && (
                                <button className="rsvp-button fade-in" onClick={nextStep}>Next</button>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="rsvp-step fade-in">
                        <h1 className="display-font" style={{ fontSize: '2.4rem', color: '#c09858', marginBottom: '2rem' }}>Will you be celebrating with us?</h1>
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <button
                                className={`rsvp-button ${formData.attending === 'yes' ? 'active' : ''}`}
                                style={{ width: '100%', maxWidth: '280px', margin: '0' }}
                                onClick={() => { setFormData({ ...formData, attending: 'yes' }); nextStep(); }}
                            >
                                Yes, I'll be there
                            </button>
                            <button
                                className={`rsvp-button ${formData.attending === 'no' ? 'active' : ''}`}
                                style={{ width: '100%', maxWidth: '280px', margin: '0' }}
                                onClick={() => { setFormData({ ...formData, attending: 'no' }); nextStep(); }}
                            >
                                Regretfully No
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="rsvp-step fade-in">
                        <h1 className="display-font" style={{ fontSize: '2.4rem', color: '#c09858', marginBottom: '2rem' }}>Where can we reach you?</h1>
                        <input
                            type="tel"
                            className="rsvp-input"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && formData.phone && nextStep()}
                        />
                        <div style={{ marginTop: '1rem', height: '60px' }}>
                            {formData.phone && (
                                <button className="rsvp-button fade-in" onClick={nextStep}>Submit</button>
                            )}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="rsvp-step fade-in" style={{ textAlign: 'center' }}>
                        <h1 className="display-font" style={{ fontSize: '2.4rem', color: '#c09858', marginBottom: '1rem' }}>Thank You</h1>
                        <p className="body-font" style={{ marginTop: '1rem', textTransform: 'none', fontSize: '1.1rem', color: '#5C5C5C', letterSpacing: '0.05em' }}>
                            We cannot wait to celebrate with you.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RSVPFlow;
