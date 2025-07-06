// src/components/About.js
import React from 'react';
import '../styles/About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2>Welcome to <span>GYM-CRAZE</span></h2>
                <p className="about-intro">
                    We are more than just a gym; we are a community dedicated to helping you achieve your fitness goals in a supportive and motivating environment. Our state-of-the-art facility and expert trainers are here to guide you on your path to a healthier, stronger you.
                </p>
                <div className="features-grid">
                    <div className="feature-item">
                        <h3>Expert Trainers</h3>
                        <p>Our certified trainers are passionate about fitness and committed to your success.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Modern Equipment</h3>
                        <p>We provide top-of-the-line equipment to ensure you have the best workout experience.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Diverse Classes</h3>
                        <p>From high-intensity interval training to relaxing yoga sessions, we have a class for everyone.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;