package com.spring.leave_management_api.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startDate;  // iziin baslangic ve bitis tarihlerinin formatlarini react tarafinda tanimladim. Dogrulamasi react tarafinda yapilacak

    private String endDate;

    private String status;

    private String reason;  // ayrilma sebebi

    @ManyToOne // birden cok izin ayni kisiye ait olabilir. Bundan dolayi ManyToOne anotasyonu kullanildi. sonrasinda dbde employee_id adinda bir sutun olacak
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}