package com.spring.leave_management_api.repository;

import com.spring.leave_management_api.entity.Employee;
import com.spring.leave_management_api.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployee(Employee employee);

    List<LeaveRequest> findByEmployeeId(Long employeeId);
}