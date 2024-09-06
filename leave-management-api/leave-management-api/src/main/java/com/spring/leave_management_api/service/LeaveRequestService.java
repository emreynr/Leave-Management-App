package com.spring.leave_management_api.service;

import com.spring.leave_management_api.entity.Employee;
import com.spring.leave_management_api.entity.LeaveRequest;
import com.spring.leave_management_api.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeaveRequestsByEmployee(Employee employee) {
        return leaveRequestRepository.findByEmployee(employee);
    }

    public LeaveRequest updateLeaveRequestStatus(Long id, String status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Leave Request not found"));
        leaveRequest.setStatus(status);
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> findAll() {
        return leaveRequestRepository.findAll();
    }

    public List<LeaveRequest> findByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }
}