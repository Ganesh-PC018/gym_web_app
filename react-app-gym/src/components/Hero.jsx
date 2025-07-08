import React from 'react';
import '../styles/Hero.css';
// Make sure to have a background image at src/assets/hero-background.jpg
import Background from '../assets/hero-background.jpg';

const Hero = () => {
  return (
    <section id="hero" className="hero-section" style={{ backgroundImage: `url(${Background})` }}>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1>Transform Your Body, Elevate Your Life</h1>
        <p>Join a community dedicated to strength, health, and wellness. Your fitness journey starts here.</p>
        <a href="#classes" className="btn btn-primary">Explore Classes</a>
      </div>
    </section>
  );
};

export default Hero;

