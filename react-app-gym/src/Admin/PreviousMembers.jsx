import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Custom CSS for advanced styling
import './PreviousMembers.css';
import { allPreviousMember } from '../service/PreviousMembers';

const PreviousMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState(false);
    const [searchTerm,setSearchTerm] = useState('');
    const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.plan.toLowerCase().includes(searchTerm.toLowerCase()))
   
    // Initialize particle engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // ----- ⬇️ YOUR SERVICE INTEGRATION GOES HERE ⬇️ -----
    // This is where you would call your backend service to fetch data.
    // I'm using mock data to simulate the API call.
    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                // **YOUR CODE HERE**: Replace this timeout with your actual API call.
                const response = await allPreviousMember();
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating network delay
                // const mockData = [
                //     { id: 1, memberId: 'M001', name: 'Eleanor Vance', contact: '555-0101', email: 'eleanor@example.com', plan: 'Platinum Annual', joiningDate: '2023-01-10', unpaidPaymentList: [{id: 1, amount: 75}, {id: 2, amount: 75}] },
                //     { id: 2, memberId: 'M002', name: 'Marcus Thorne', contact: '555-0102', email: 'marcus@example.com', plan: 'Gold Monthly', joiningDate: '2023-02-22', unpaidPaymentList: [] },
                //     { id: 3, memberId: 'M003', name: 'Seraphina Reed', contact: '555-0103', email: 'sera@example.com', plan: 'Silver Quarterly', joiningDate: '2023-03-15', unpaidPaymentList: [{id: 3, amount: 50}] },
                // ];
                setMembers(response.data);
                toast.success('Member records retrieved!');
            } catch (error) {
                toast.error('Failed to fetch member records.');
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);
    // ----- ⬆️ YOUR SERVICE INTEGRATION ENDS HERE ⬆️ -----

    const particlesLoaded = (container) => {
        console.log("Particles loaded:", container);
    };

    const particleOptions = {
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: 'repulse' },
                resize: true,
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
            },
        },
        particles: {
            color: { value: '#AAB7C4' },
            links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 2, straight: false },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.2 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
    };

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }

    return (
        <section>
            {init && <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particleOptions} />}
            <div className="container py-1">
                {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" /> */}
                
                <motion.div
                    className="text-center mb-5"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                >
                    <h1 className="display-4 fw-bolder text-light">Our Legacy Members</h1>
                    <p className="lead text-muted text-light">A tribute to the members who have been part of our journey.</p>
                </motion.div>
                      <div className="input-group mb-3" style={{ width: '80vw', textAlign: 'center', alignItems: 'center', margin: '10px auto', borderRadius: '10px' }}>
        <input
          type="text"
          id="keyword"
          name="keyword"
          className="form-control"
          placeholder="Search member..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <span className="input-group-text bg-warning">
          <i className="bi bi-search"></i>
        </span>
      </div>
                <AnimatePresence>
                    <motion.div
                        className="row g-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredMembers.map(member => (
                            <motion.div key={member.id} className="col-lg-4 col-md-6" variants={itemVariants}>
                                <div className="card member-card h-100 bg-dark">
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="avatar me-3">
                                                <i className="bi bi-person-fill"></i>
                                            </div>
                                            <div>
                                                <h5 className="card-title fw-bold mb-0">{member.name}</h5>
                                                <small className="text-light">{member.memberId}</small>
                                            </div>
                                        </div>
                                        <ul className="list-unstyled flex-grow-1">
                                            <li className="mb-2"><i className="bi bi-telephone-fill text-primary me-2"></i>{member.contact}</li>
                                            <li className="mb-2"><i className="bi bi-envelope-at-fill text-primary me-2"></i>{member.email}</li>
                                            <li className="mb-2"><i className="bi bi-calendar-check-fill text-primary me-2"></i>Joined: {member.joiningDate}</li>
                                            <li className="mb-2"><i className="bi bi-gem text-primary me-2"></i>Plan: {member.plan}</li>
                                        </ul>
                                        
                                        {member.unpaidPaymentList.length > 0 && (
                                            <div className="unpaid-section mt-auto ">
                                                <h6 className="text-danger fw-bold"><i className="bi bi-exclamation-triangle-fill me-2"></i>Outstanding Payments</h6>
                                                <ul className="list-group list-group-flush">
                                                    {member.unpaidPaymentList.map(payment => (
                                                        <li key={payment.id} className="list-group-item d-flex justify-content-between align-items-center px-3">
                                                            Pending Amount
                                                            <span className="badge bg-danger rounded-pill">${payment.year_month}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-footer bg-transparent border-0 text-center pt-0">
                                        <motion.button className="btn btn-outline-primary btn-sm" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            View History
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PreviousMembers;