// src/components/Classes.js
import React from 'react';
import '../styles/Classes.css';
// Import your class images
import YogaImg from '../assets/yoga-class.jpg';
import WeightsImg from '../assets/clss-weights.jpg';
import CardioImg from '../assets/class-cardio.jpg';

const ClassCard = ({ image, title, description }) => (
    <div className="class-card">
        <img src={image} alt={title}  width={500} height={500}/>
        <div className="card-content">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);


const Classes = () => {
    return (
        <section id="classes">
            <div className="container">
                <h2>Our <span>Classes</span></h2>
                <div className="classes-grid">
                   <ClassCard image={YogaImg} title="Yoga & Flow" description="Improve flexibility, balance, and mindfulness with our guided yoga sessions." />
                   <ClassCard image={WeightsImg} title="Strength Training" description="Build muscle and increase your strength with our free weights and machine circuits." />
                   <ClassCard image={CardioImg} title="Cardio Blast" description="Get your heart pumping with high-energy HIIT, cycling, and treadmill workouts." />
                </div>
            </div>
        </section>
    );
};

export default Classes;