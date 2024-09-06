package com.spring.leave_management_api.Controller;


import com.spring.leave_management_api.entity.Employee;
import com.spring.leave_management_api.entity.LeaveRequest;
import com.spring.leave_management_api.service.EmployeeService;
import com.spring.leave_management_api.service.LeaveRequestService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/leaverequests")
@CrossOrigin(origins = "http://localhost:3000") // accepts all requests
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        LeaveRequest createdLeaveRequest = leaveRequestService.createLeaveRequest(leaveRequest);
        return ResponseEntity.ok(createdLeaveRequest);
    }

    @GetMapping("/employee/{email}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsByEmployee(@PathVariable String email) {
        Employee employee = employeeService.getEmployeeByEmail(email);
        List<LeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsByEmployee(employee);
        return ResponseEntity.ok(leaveRequests);
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
        List<LeaveRequest> leaveRequests = leaveRequestService.findAll();
        return ResponseEntity.ok(leaveRequests);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveRequest> updateLeaveRequestStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        LeaveRequest updatedLeaveRequest = leaveRequestService.updateLeaveRequestStatus(id, status);
        return ResponseEntity.ok(updatedLeaveRequest);
    }

    @GetMapping("/my-leaverequests")
    public List<LeaveRequest> getMyLeaveRequests(HttpSession session) {
        String email = (String) session.getAttribute("currentUserEmail");
        if (email == null) {
            throw new RuntimeException("User not authenticated");
        }
        Employee employee = employeeService.getEmployeeByEmail(email);
        return leaveRequestService.getLeaveRequestsByEmployee(employee);
    }

}
