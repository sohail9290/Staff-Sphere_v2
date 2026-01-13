package net.sohail.ems_backend.service;

import net.sohail.ems_backend.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    DepartmentDto createDepartment(DepartmentDto departmentDto);
    DepartmentDto getDepartmentById(Long DepartmentId);
    List<DepartmentDto> getAllDepartments();
    DepartmentDto updateDepartment(Long departmentId,DepartmentDto departmentDto);
    void deleteDepartment(Long departmentId);
}
