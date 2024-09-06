package com.spring.leave_management_api.Controller;


import com.spring.leave_management_api.entity.Employee;
import com.spring.leave_management_api.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000") // RequestMapping'e disaridan gelecek istekler icin tanimlama yapildi
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @GetMapping("/{email}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String email) {
        Employee employee = employeeService.getEmployeeByEmail(email);
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/login")
    public ResponseEntity<Employee> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Employee employee = employeeService.getEmployeeByEmail(email);
        if (employee != null && employee.getPassword().equals(password)) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Employee employee = employeeService.updateEmployee(id, updatedEmployee);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        try {
            Employee employee = employeeService.getEmployeeById(id);
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }


    @PostMapping("/register")
    public ResponseEntity<Employee> register(@RequestBody Map<String, String> registrationInfo) {
        String email = registrationInfo.get("email");
        String password = registrationInfo.get("password");
        String name = registrationInfo.get("name");
        String surname = registrationInfo.get("surname");

        try {
            Employee newEmployee = employeeService.registerEmployee(email, password, name, surname);
            return ResponseEntity.ok(newEmployee);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}