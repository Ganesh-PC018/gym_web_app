import React from 'react';
import '../styles/memberships.css';

const Memberships = () => {
  return (
    <section className="memberships">
      <h2>Choose Your Membership</h2>
      <div className="membership-cards">
        <div className="card">
          <h3>Classic</h3>
          <p className="price">₹900/month</p>
          <ul>
            <li>Unlimited Access to Home Club</li>
            <li>Free Fitness Training</li>
            <li>Free WiFi</li>
          </ul>
          <button className="btn-secondary">Learn More</button>
        </div>
        <div className="card pf-black-card">
          <h3>PF Black Card®</h3>
          <p className="price">$24.99/month</p>
          <ul>
            <li>Use of Any Planet Fitness Worldwide</li>
            <li>Bring a Guest Anytime</li>
            <li>Use of Massage Chairs</li>
            <li>And much more!</li>
          </ul>
          <button className="btn-primary">Join Now</button>
        </div>
      </div>
    </section>
  );
};

export default Memberships;
