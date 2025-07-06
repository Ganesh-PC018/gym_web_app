import React, { useState, useMemo, useEffect } from 'react';
import MemberFees from './MemberFees';
import './ManageForm.css'; // Your new CSS file
// import './Admin.css'; // Your existing admin styles
import { addMember, allMembers, deleteMember, updateMember } from '../service/MemberService';
import FeesManager from './FeesManager.jsx'
import toast from 'react-hot-toast';
import InterestedMembersTable from './InterestedMembersTable.jsx'
const ManageAdmin = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setshowUpdateForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        plan: 'Basic Fit',
        status: true, // Frontend state for 'Active' (boolean)
        joiningDate: '',
    });
    const [updateformData, setupdateFormData] = useState({
        name: '',
        contact: '',
        email: '',
        plan: 'Basic Fit',
        status: true, // Frontend state for 'Active' (boolean)
        joiningDate: '',
        memberId: '',
    });

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await allMembers();
                // Process members to ensure status is a boolean for frontend
                const processedMembers = response.data.map(member => ({
                    ...member,
                    // Convert backend string 'Active'/'Inactive' to boolean true/false
                    status: member.status === 'Active' || member.status === true
                }));
                setMembers(processedMembers);
            } catch (error) {
                console.error("Error at All Members:", error);
                toast.error("Failed to fetch members.");
            }
        };
        fetchMembers();
    }, []);

    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.status === true).length;
    // Assuming feesOverdue is calculated elsewhere or a static value for now
    const feesOverdue = 0;

    const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.plan.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation check
        if (!formData.name || !formData.contact || !formData.email || !formData.joiningDate) {
            toast.error("Please fill out all required fields.");
            return;
        }

        // Convert boolean status to string 'Active' or 'Inactive' for the backend
        const newMemberForBackend = {
            ...formData,
            status: formData.status ? 'Active' : 'Inactive',
        };
        console.log("New member data for backend:", newMemberForBackend);

        try {
            toast.promise(
                addMember(newMemberForBackend).then(response => {
                    // Assuming the backend response returns the added member with status as string
                    const responseData = response.data;
                    // Convert status back to boolean for local state
                    setMembers(prev => [...prev, { ...responseData, status: responseData.status === 'Active' }]);
                    setShowForm(false);
                    setFormData({ name: '', contact: '', email: '', plan: 'Basic Fit', status: true, joiningDate: '' });
                }),
                {
                    loading: 'Adding new member...',
                    success: <b style={{ color: 'black' }}>Member added successfully!</b>,
                    error: <b style={{ color: 'black' }}>Could not add member.</b>,
                }
            );
        } catch (error) {
            console.error("Failed to add member", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Convert boolean status to string 'Active' or 'Inactive' for the backend
        const updatedMemberForBackend = {
            ...updateformData,
            status: updateformData.status ? 'Active' : 'Inactive',
        };
        console.log("Updated member data for backend:", updatedMemberForBackend);

        try {
            toast.promise(
                updateMember(updatedMemberForBackend).then(() => {
                    // Update the member in the local state
                    setMembers(prevMembers =>
                        prevMembers.map(m =>
                            m.memberId === updatedMemberForBackend.memberId
                                ? {
                                    ...updatedMemberForBackend,
                                    // Convert status back to boolean for local state
                                    status: updatedMemberForBackend.status === 'Active'
                                }
                                : m
                        )
                    );
                    setshowUpdateForm(false);
                }),
                {
                    loading: 'Updating member details...',
                    success: <b style={{ color: 'black' }}>Details updated successfully!</b>,
                    error: <b style={{ color: 'black' }}>Could not update details.</b>,
                }
            );
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const handleDeleteMember = async (member) => {
        try {
            await deleteMember(member.memberId); // No need to store response if not used
            // Update local state to remove the deleted member
            setMembers(prevMembers =>
                prevMembers.filter(m => m.memberId !== member.memberId)
            );
            toast.success("Member Deleted Successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Problem While Deleting member.");
        }
    };

    const handleEditMember = async (member) => {
        console.log("Member to edit:", member);
        setupdateFormData({
            name: member.name,
            contact: member.contact,
            email: member.email,
            plan: member.plan,
            status: member.status, // This will already be a boolean from `processedMembers`
            joiningDate: member.joiningDate,
            memberId: member.memberId,
        });
        setshowUpdateForm(true);
    }

    return (
        <div className="admin-container bg-dark text-light" id='admin' style={{ marginTop: '80px' }}>
            <aside className="admin-sidebar">
                <h3>Admin</h3>
                <nav className='nav-bar'>
                    <button onClick={() => setActiveView('dashboard')} className={activeView === 'dashboard' ? 'active' : ''}>Dashboard</button>
                    <button onClick={() => setActiveView('fees')} className={activeView === 'fees' ? 'active' : ''}>Member Fees</button>
                    <button onClick={() => setActiveView('updateFees')} className={activeView === 'updateFees' ? 'active' : ''}>Update Fees</button>
                    <button onClick={() => setActiveView('interestedMembers')} className={activeView === 'interestedMembers' ? 'active' : ''}>interested Members</button>
                </nav>
            </aside>

            <main className="admin-main-content">
                <header className="admin-header">
                    <h1>Welcome, Admin</h1>
                    <button className="btn-add-member" onClick={() => setShowForm(true)}>+ Add Member</button>
                </header>

                {/* ADD MEMBER FORM MODAL */}
                {showForm && (
                    <div className="form-popup-overlay show">
                        <div className="bg-dark text-light add-member-form-container">
                            <button className="close-btn" onClick={() => setShowForm(false)}>&times;</button>
                            <h2>Add New Member</h2>
                            <form onSubmit={handleSubmit} className="add-member-form">
                                <div className="form-group">
                                    <i className="bi bi-person-fill text-warning"></i>
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <i className="bi bi-telephone-fill text-primary"></i>
                                    <label htmlFor="contact">Contact Number</label>
                                    <input type="text" id="contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required />
                                </div>
                                <div className="form-group full-width">
                                    <i className="bi bi-envelope-fill text-danger"></i>
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="plan">Membership Plan</label>
                                    <select id="plan" value={formData.plan} onChange={(e) => setFormData({ ...formData, plan: e.target.value })}>
                                        <option>Basic Fit</option> <option>Pro Fit</option> <option>Elite Fit</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" value={formData.status ? 'Active' : 'Not Active'} onChange={(e) => setFormData({ ...formData, status: e.target.value === 'Active' })}>
                                        <option value="Active">Active</option>
                                        <option value="Not Active">Not Active</option>
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <i className="bi bi-calendar-check-fill text-warning"></i>
                                    <label htmlFor="joiningDate">Joining Date</label>
                                    <input
                                        type="date"
                                        id="joiningDate"
                                        value={formData.joiningDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, joiningDate: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <button type="submit" className="submit-btn">Add Member</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* UPDATE MEMBER FORM MODAL */}
                {showUpdateForm && (
                    <div className="form-popup-overlay show">
                        <div className="add-member-form-container">
                            <button className="close-btn" onClick={() => setshowUpdateForm(false)}>&times;</button>
                            <h2>Update Member Details</h2>
                            <form onSubmit={handleUpdate} className="add-member-form">
                                <div className="form-group">
                                    <i className="bi bi-person-fill"></i>
                                    <label htmlFor="update-name">Full Name</label>
                                    <input type="text" id="update-name" value={updateformData.name} onChange={(e) => setupdateFormData({ ...updateformData, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <i className="bi bi-telephone-fill"></i>
                                    <label htmlFor="update-contact">Contact Number</label>
                                    <input type="text" id="update-contact" value={updateformData.contact} onChange={(e) => setupdateFormData({ ...updateformData, contact: e.target.value })} required />
                                </div>
                                <div className="form-group full-width">
                                    <i className="bi bi-envelope-fill"></i>
                                    <label htmlFor="update-email">Email Address</label>
                                    <input type="email" id="update-email" value={updateformData.email} onChange={(e) => setupdateFormData({ ...updateformData, email: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="update-plan">Membership Plan</label>
                                    <select id="update-plan" value={updateformData.plan} onChange={(e) => setupdateFormData({ ...updateformData, plan: e.target.value })}>
                                        <option>Basic Fit</option> <option>Pro Fit</option> <option>Elite Fit</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="update-status">Status</label>
                                    <select id="update-status" value={updateformData.status ? 'Active' : 'Not Active'} onChange={(e) => setupdateFormData({ ...updateformData, status: e.target.value === 'Active' })}>
                                        <option value="Active">Active</option>
                                        <option value="Not Active">Not Active</option>
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <i className="bi bi-calendar-check-fill"></i>
                                    <label htmlFor="update-joiningDate">Joining Date</label>
                                    <input type="date" id="update-joiningDate" value={updateformData.joiningDate} onChange={(e) => setupdateFormData({ ...updateformData, joiningDate: e.target.value })} required />
                                </div>
                                <button type="submit" className="submit-btn">Save Changes</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Dashboard and Fees Views */}
                {activeView === 'dashboard' && (
                    <div id="dashboard">
                        {/* Statistics Cards */}
                        <div className="stats-cards">
                            <div className="cards">
                                <h3><i className="bi bi-people-fill"></i> Total Members</h3>
                                <p>{totalMembers}</p>
                            </div>
                            <div className="cards">
                                <h3><i className="bi bi-person-check-fill"></i> Active Members</h3>
                                <p>{activeMembers}</p>
                            </div>
                            <div className="cards">
                                <h3><i className="bi bi-exclamation-triangle-fill"></i> Fees Overdue</h3>
                                <p>{feesOverdue}</p>
                            </div>
                        </div>

                        {/* Member Details Table View */}
                        <div className="member-details-view">
                            <div className="member-details-header">
                                <h2>Member Details</h2>
                                <div className="input-group mb-3">
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
                            </div>
                            <div className="table-responsive">
                                <table className="details-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Plan</th>
                                            <th>Joining Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMembers.length > 0 ? (
                                            filteredMembers.map((member, index) => (
                                                <tr key={member.memberId || index}>
                                                    <td>{member.memberId}</td>
                                                    <td>{member.name}</td>
                                                    <td>{member.contact}</td>
                                                    <td>{member.email}</td>
                                                    <td>{member.plan}</td>
                                                    <td>{member.joiningDate ? new Date(member.joiningDate).toLocaleDateString() : 'N/A'}</td>
                                                    <td>
                                                        <span className={`status-badge ${member.status ? 'status-active' : 'status-inactive'}`}>
                                                            {member.status ? 'ACTIVE' : 'INACTIVE'}
                                                        </span>
                                                    </td>
                                                    <td className="action-icons">
                                                        <i
                                                            className="bi bi-pencil-square text-primary fs-5"
                                                            style={{ margin: '10px' }}
                                                            title="Edit Member"
                                                            onClick={() => handleEditMember(member)}
                                                        ></i>
                                                        <i
                                                            className="bi bi-trash-fill text-danger fs-5"
                                                            title="Delete Member"
                                                            onClick={() => handleDeleteMember(member)}
                                                        ></i>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center">No members found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
                {activeView === 'fees' && <MemberFees members={members} />}
                {activeView === 'updateFees' && <FeesManager/>}
                {activeView === 'interestedMembers' && <InterestedMembersTable/>}
            </main>
        </div>
    );
};

export default ManageAdmin;