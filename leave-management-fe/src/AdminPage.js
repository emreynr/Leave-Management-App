// AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const response = await axios.get('/leaverequests');
            setLeaveRequests(response.data);
        };
        fetchLeaveRequests();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        await axios.put(`/leaverequests/${id}`, { status });
        setLeaveRequests(leaveRequests.map(lr => lr.id === id ? { ...lr, status } : lr));
    };

    return (
        <div>
            <h2>Admin - Manage Leave Requests</h2>
            <ul>
                {leaveRequests.map(lr => (
                    <li key={lr.id}>
                        {lr.startDate} to {lr.endDate} - {lr.status}
                        <button onClick={() => handleUpdateStatus(lr.id, 'APPROVED')}>Approve</button>
                        <button onClick={() => handleUpdateStatus(lr.id, 'REJECTED')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
