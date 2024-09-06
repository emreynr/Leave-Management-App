import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styles from './AllLeaveRequestsPage.module.css';

Modal.setAppElement('#root');

const AllLeaveRequestsPage = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8080/leaverequests'); // gelen isteklerin yakalanmasi
                setLeaveRequests(response.data);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };
        fetchLeaveRequests();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8080/leaverequests/${id}/status`, { status }); // admin tarafinda id degerine gore calisan alinip bilgilerinin guncellenmesi
            setLeaveRequests(prevRequests =>
                prevRequests.map(lr => lr.id === id ? { ...lr, status } : lr)
            );
        } catch (error) {
            console.error('Error updating leave request status:', error);
        }
    };

    const openUpdateModal = (employee) => {
        setSelectedEmployee(employee);
        setUpdatedName(employee.name);
        setUpdatedEmail(employee.email);
        setModalIsOpen(true);
    };

    const closeUpdateModal = () => {
        setModalIsOpen(false);
        setSelectedEmployee(null);
        setUpdatedName('');
        setUpdatedEmail('');
    };

    const handleUpdateEmployee = async () => {
        if (!selectedEmployee) return;
        try {
            const updatedEmployee = {
                name: updatedName || selectedEmployee.name,
                email: updatedEmail || selectedEmployee.email
            };
            await axios.put(`http://localhost:8080/employees/${selectedEmployee.id}`, updatedEmployee);
            setLeaveRequests(prevRequests =>
                prevRequests.map(lr =>
                    lr.employee.id === selectedEmployee.id
                        ? { ...lr, employee: { ...selectedEmployee, ...updatedEmployee } }
                        : lr
                )
            );
            closeUpdateModal();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            await axios.delete(`http://localhost:8080/employees/${employeeId}`);
            setLeaveRequests(prevRequests => prevRequests.filter(lr => lr.employee.id !== employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>All Leave Requests</h2>
            <ul className={styles.leaveList}>
                {leaveRequests.map(lr => (
                    <li key={lr.id} className={styles.leaveItem}>
                        <div className={styles.leaveDetails}>
                            <span>{lr.startDate} to {lr.endDate}</span>
                            <span>Status: {lr.status}</span>
                            <p>Reason: {lr.reason || 'No reason provided'}</p>
                            <div className={styles.employeeInfo}>
                                <h3>Employee Information</h3>
                                <p>Name: {lr.employee.name}</p>
                                <p>Email: {lr.employee.email}</p>
                                <button onClick={() => openUpdateModal(lr.employee)}>Update Employee</button>
                                <button onClick={() => handleDeleteEmployee(lr.employee.id)}>Delete Employee</button>
                            </div>
                        </div>
                        {lr.status === 'PENDING' && (
                            <div className={styles.actions}>
                                <button className={styles.button} onClick={() => updateStatus(lr.id, 'APPROVED')}>Approve</button>
                                <button className={styles.button} onClick={() => updateStatus(lr.id, 'REJECTED')}>Reject</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeUpdateModal}
                contentLabel="Update Employee Information"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h3>Update Employee Information</h3>
                <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                    placeholder="Email"
                />
                <button onClick={handleUpdateEmployee}>Save Changes</button>
                <button onClick={closeUpdateModal}>Cancel</button>
            </Modal>
        </div>
    );
};

export default AllLeaveRequestsPage;
