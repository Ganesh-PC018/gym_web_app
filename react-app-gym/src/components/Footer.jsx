// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer id="contact" className="footer ">
            <div className="container footer-container">
                <p>&copy; 2025 GYM-CRAZE. All Rights Reserved.</p>
                <div className="d-flex social-links">
                    <div>
                        <i className="bi bi-facebook mx-2  fs-5"></i>
                    </div>
                    <div>
                        <i className="bi bi-instagram mx-2 fs-5"></i>
                    </div>
                    <div>
                        <i className="bi bi-twitter mx-2 fs-5"></i>
                    </div>
                </div>
            </div>

        </footer>
    );
};
export default Footer;