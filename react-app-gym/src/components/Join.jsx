// src/components/Join.js
import React from 'react';
import '../styles/Join.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { addInterestedMember } from '../service/InterestedMembersService';
const Join = () => {
    const [interestedMember, setInterestedMember] = useState({
        name: '',
        contact: '',
        address: ''
    });
    const handleAddInterested = (e) => {
        e.preventDefault(); // prevent form reload

        const trimmedMember = {
            name: interestedMember.name.trim(),
            contact: interestedMember.contact.trim(),
            address: interestedMember.address.trim(),
        };

        // Validation
        if (!trimmedMember.name || !trimmedMember.contact || !trimmedMember.address) {
            toast.error("All fields are required..!!");
            return;
        }

        if (trimmedMember.contact.length !== 10 || !/^\d+$/.test(trimmedMember.contact)) {
            toast.error("Contact number must be 10 digits.");
            return;
        }

        // API call
        const addMember = async () => {
            try {
                const response = await addInterestedMember(trimmedMember);
                toast.success("We will reach out to you soon.");
                setInterestedMember({ name: '', contact: '', address: '' });
            } catch (error) {
                console.error("Error saving data:", error);
                toast.error("Unable to save data.");
            }
        };

        addMember();
    };

    return (
        <section id="join" className="join-section">
            <div className="container">
                <div className="join-content">
                    <h2>Ready to <span>Start?</span></h2>
                    <p>Fill out the form below to get started on your fitness journey with us. We can't wait to see you!</p>
                    <form className="join-form">
                        <input type="text" placeholder="Your Name" required onChange={(e) => setInterestedMember({ ...interestedMember, name: e.target.value })} value={interestedMember.name}/>
                        <input type="number" placeholder="Your Contact" required onChange={(e) => setInterestedMember({ ...interestedMember, contact: e.target.value })} value={interestedMember.contact}/>
                        <input type="address" placeholder="Your Address" required onChange={(e) => setInterestedMember({ ...interestedMember, address: e.target.value })} value={interestedMember.address} />
                        <button type="submit" className="btn btn-primary" onClick={handleAddInterested}>Become a Member</button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Join;