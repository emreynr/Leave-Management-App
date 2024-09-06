package com.spring.leave_management_api.service;

import com.spring.leave_management_api.entity.Employee;
import com.spring.leave_management_api.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    /*
    hatirlatma: service kismi icin once interface olusturup sonrasinda bu interface uzerinden metodlari alip kullanabilirdim fakat cok fazla servis olmadigi icin
    dogrudan class seklinde kullanmak istedim
     */

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        // kisa bir hata mesaji gosterecek
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setEmail(updatedEmployee.getEmail());

        return employeeRepository.save(existingEmployee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        employeeRepository.delete(employee);
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }


    public Employee registerEmployee(String email, String password, String name, String surname) {
        Employee employee = new Employee();
        employee.setEmail(email);
        employee.setPassword(password);
        employee.setName(name);
        employee.setSurname(surname);
        return employeeRepository.save(employee);
    }


}