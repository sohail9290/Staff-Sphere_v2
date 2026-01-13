package net.sohail.ems_backend.service.impl;

import lombok.AllArgsConstructor;
import net.sohail.ems_backend.dto.EmployeeDto;
import net.sohail.ems_backend.entity.Employee;
import net.sohail.ems_backend.exception.ResourceNotFoundException;
import net.sohail.ems_backend.mapper.EmployeeMapper;
import net.sohail.ems_backend.repository.EmployeeRepository;
import net.sohail.ems_backend.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee not found"));
        EmployeeDto employeeDto = EmployeeMapper.mapToEmployeeDto(employee);
        return employeeDto;
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees=employeeRepository.findAll();
        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto upadtedEmployee) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee not found"));
        employee.setFirstName(upadtedEmployee.getFirstName());
        employee.setLastName(upadtedEmployee.getLastName());
        employee.setEmail(upadtedEmployee.getEmail());
        Employee updatedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee not found"));
        employeeRepository.deleteById(employeeId);
    }
}
