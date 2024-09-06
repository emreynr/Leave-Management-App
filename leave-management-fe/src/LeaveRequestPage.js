import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LeaveRequestPage.module.css';

const LeaveRequestPage = ({ employee }) => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const response = await axios.get(`http://localhost:8080/leaverequests/employee/${employee.email}`);
            setLeaveRequests(response.data);
        };
        fetchLeaveRequests();
    }, [employee]);

    const handleLeaveRequest = async () => {
        const response = await axios.post('http://localhost:8080/leaverequests', {
            startDate,
            endDate,
            reason,
            status: 'PENDING',
            employee
        });
        setLeaveRequests([...leaveRequests, response.data]);
    };

    const handleViewProfile = () => {
        navigate('/employee-profile');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Leave Requests for {employee.name}</h2>
            <ul className={styles.leaveList}>
                {leaveRequests.map(lr => (
                    <li key={lr.id} className={styles.leaveItem}>
                        <div className={styles.leaveDetails}>
                            {lr.startDate} to {lr.endDate} - {lr.status} - {lr.reason}
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={styles.input} />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={styles.input} />
                <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Reason for leave"
                    className={styles.input}
                />
                <button onClick={handleLeaveRequest} className={styles.button}>Request Leave</button>
            </div>
            <button onClick={handleViewProfile} className={styles.button}>Go to Profile</button>
        </div>
    );
};

export default LeaveRequestPage;
