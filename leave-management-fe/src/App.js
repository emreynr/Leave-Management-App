import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import LeaveRequestPage from './LeaveRequestPage';
import AllLeaveRequestsPage from './AllLeaveRequestsPage';
import EmployeeProfilePage from  './EmployeeProfilePage';
const App = () => {
    const [employee, setEmployee] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage setEmployee={setEmployee} />} />
                <Route path="/leave-requests" element={employee ? (<LeaveRequestPage employee={employee} /> ) : ( <Navigate to="/login" /> ) }/>
                <Route path="/all-leave-requests" element={<AllLeaveRequestsPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/employee-profile" element={employee ? <EmployeeProfilePage employee={employee} /> : <LoginPage setEmployee={setEmployee} />} />
                
            </Routes>
        </Router>
    );
};

export default App;