// src/components/admin/MemberFees.jsx
import React, { useEffect, useState } from 'react';
import './Admin.css';
import { getAllPayments, updatePaymentStatus } from '../service/PaymentService';

const MemberFees = ({ members }) => {
    const [paymentsData, setPaymentsData] = useState({});

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await getAllPayments();
                // console.log(response.data);
                const structuredData = {};

                response.data.forEach(payment => {
                    const { memberId, yearMonth, status } = payment;
                    if (!structuredData[memberId]) {
                        structuredData[memberId] = {};
                    }
                    const normalizedStatus = String(status).toUpperCase() === "PAID" ? "PAID" : "NOT PAID";
                    structuredData[memberId][yearMonth] = normalizedStatus;
                });

                setPaymentsData(structuredData);
            } catch (error) {
                console.error("Error fetching payment data", error);
            }
        };

        fetchPayments();
    }, []);

    const handleStatusToggle = async (memberId, monthKey) => {
        const currentStatus = paymentsData[memberId]?.[monthKey] ?? "NOT PAID";
        const newStatus = currentStatus === "PAID" ? "NOT PAID" : "PAID";

        try {
            // 1. Update backend
            await updatePaymentStatus({
                memberId: memberId,
                yearMonth: monthKey,
                status: currentStatus,
            });

            // 2. Update local state for immediate UI feedback
            setPaymentsData(prevData => {
                const newData = { ...prevData };
                if (!newData[memberId]) {
                    newData[memberId] = {};
                }
                newData[memberId][monthKey] = newStatus;
                return newData;
            });

        } catch (error) {
            console.error("Error updating payment status", error);
            // Optionally, show an error message to the user
        }
    };

    // Generate Month Columns from January to current month
    const getMonthColumns = () => {
        const months = [];
        const start = new Date(new Date().getFullYear(), 0); // Jan of current year
        const end = new Date();
        const current = new Date(start);

        while (current <= end) {
            months.push(new Date(current));
            current.setMonth(current.getMonth() + 1);
        }
        return months;
    };

    const monthColumns = getMonthColumns();

    return (
        <div className="fees-details-view">
            <h2>Member Fees Details (Year {new Date().getFullYear()})</h2>
            <div className="table-container">
                <table className="fees-table">
                    <thead>
                        <tr>
                            <th>Member Name</th>
                            {monthColumns.map(month => (
                                <th key={month.toISOString()}>
                                    {month.toLocaleString('default', { month: 'short' })}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member,index) => {
                            const joiningDate = new Date(member.joiningDate);
                            // Add a class to the row if the member is inactive
                            
                            const rowClass = member.status === 'Inactive' ? 'inactive-row' : '';

                            return (
                                <tr key={member.memberId} className={rowClass}>
                                    <td>
                                        {member.name}
                                        <span className="joining-date-tooltip">
                                            Joined: {joiningDate.toLocaleDateString()}
                                        </span>
                                    </td>
                                    {monthColumns.map(month => {
                                        const monthKey = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
                                        const joiningYear = joiningDate.getFullYear();
                                        const joiningMonth = joiningDate.getMonth();
                                        const currentYear = month.getFullYear();
                                        const currentMonth = month.getMonth();

                                        // Only show toggles for months after or including the joining month
                                        const isAfterJoining = (currentYear > joiningYear) || (currentYear === joiningYear && currentMonth >= joiningMonth);

                                        if (!isAfterJoining) {
                                            return <td key={month.toISOString()}><span className="status-disabled">-</span></td>;
                                        }

                                        // If the member is inactive, disable the button
                                        console.log("checK ",member);
                                        if (member.status === false) {
                                            return <td key={month.toISOString()}><span className="status-badge status-na">INACTIVE</span></td>;
                                        }
                                        
                                        const status = paymentsData[member.memberId]?.[monthKey] ?? "NOT PAID";

                                        return (
                                            <td key={month.toISOString()}>
                                                <button
                                                    onClick={() => handleStatusToggle(member.memberId, monthKey)}
                                                    className={`status-toggle ${status === 'PAID' ? 'status-paid' : 'status-not-paid'}`}
                                                >
                                                    {status}
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberFees;