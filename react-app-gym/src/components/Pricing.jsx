import { useState, useEffect, useRef } from 'react';
import '../styles/Pricing.css';
import { allFees } from '../service/FeesService';

const Pricing = () => {
  const [fees, setFees] = useState({ basic: 0, pro: 0, elite: 0 });

  const scrollContainerRef = useRef(null);
  const middleCardRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await allFees();
        setFees({
          basic: response.data.basic,
          pro: response.data.pro,
          elite: response.data.elite,
        });
      } catch (error) {
        console.error("Failed to fetch fees:", error);
      }
    };
    fetchFees();
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    let hasScrolled = false;

    if (isMobile && sectionRef.current && middleCardRef.current && scrollContainerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasScrolled) {
            hasScrolled = true; // Prevent multiple triggers
            middleCardRef.current.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest',
            });
            observer.disconnect(); // Optional: Stop observing after first scroll
          }
        },
        {
          root: null,
          threshold: 0.5, // Trigger when 50% of section is visible
        }
      );

      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section id="pricing" className="pricing-section" ref={sectionRef}>
      <div className="container">
        <h2>Membership <span>Plans</span></h2><br />
        <div className="pricing-grid" ref={scrollContainerRef}>
          <div className="pricing-card">
            <h3>Basic Fit</h3>
            <p className="price"><span>₹{fees.basic || '...'}</span>/month</p>
            <ul>
              <li>✓ Gym Access</li>
              <li>✓ Basic Equipment</li>
              <li>✗ Group Classes</li>
              <li>✗ Personal Trainer</li>
              <li>✗ Sauna Access</li>
            </ul>
            <a href="#join" className="btn btn-secondary">Choose Plan</a>
          </div>

          <div className="pricing-card popular" ref={middleCardRef}>
            <span className="popular-badge">Most Popular</span>
            <h3>Pro Fit</h3>
            <p className="price"><span>₹{fees.pro || '...'}</span>/3month</p>
            <ul>
              <li>✓ Gym Access</li>
              <li>✓ All Equipment</li>
              <li>✓ All Group Classes</li>
              <li>✓ Personal Trainer Session</li>
              <li>✗ Sauna Access</li>
            </ul>
            <a href="#join" className="btn btn-primary">Choose Plan</a>
          </div>

          <div className="pricing-card">
            <h3>Elite Fit</h3>
            <p className="price"><span>₹{fees.elite || '...'}</span>/year</p>
            <ul>
              <li>✓ Gym Access</li>
              <li>✓ All Equipment</li>
              <li>✓ All Group Classes</li>
              <li>✓ Weekly Trainer Session</li>
              <li>✓ Sauna & Spa Access</li>
            </ul>
            <a href="#join" className="btn btn-secondary">Choose Plan</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
