import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EmployeeProfilePage.module.css';

const EmployeeProfilePage = ({ employee }) => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            const response = await axios.get(`http://localhost:8080/leaverequests/employee/${employee.email}`);
            setLeaveRequests(response.data);
        };
        fetchLeaveRequests();
    }, [employee]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Your Leave Requests</h2>
            <ul className={styles.leaveList}>
                {leaveRequests.map(lr => (
                    <li key={lr.id} className={styles.leaveItem}>
                        <div className={styles.leaveDetails}>
                            {lr.startDate} to {lr.endDate} - {lr.status} - {lr.reason}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeProfilePage;