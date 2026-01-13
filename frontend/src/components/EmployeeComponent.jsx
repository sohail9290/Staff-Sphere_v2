import React, { use, useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch(error => {
      console.error('There was an error fetching the departments!', error);
    });
  }, []);

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  })
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        const employee = response.data;
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmail(employee.email);
        setDepartmentId(employee.departmentId);
      }).catch(error => {
        console.error('There was an error fetching the employee!', error);
      });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log('Employee updated successfully', response.data);
          navigate('/employees');
        }).catch(error => {
          console.error('There was an error updating the employee!', error);
        });
      } else {
        createEmployee(employee).then((response) => {
          console.log('Employee added successfully', response.data);
          navigate('/employees');
        }).catch(error => {
          console.error('There was an error adding the employee!', error);
        });
      }

    }

  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = ' ';
    } else {
      errorsCopy.firstName = 'First Name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = ' ';
    } else {
      errorsCopy.lastName = 'Last Name is required';
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = ' ';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    if (departmentId) {
      errorsCopy.department = ' ';
    } else {
      errorsCopy.department = 'Department selection is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h3 className="text-center mt-3">Update Employee</h3>;
    } else {
      return <h3 className="text-center mt-3">Add Employee</h3>;
    }
  }
  return (
    <div className="container mt-5 pt-4">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>

              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Select Department</label>
                <select
                  className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value=''>--Select Department--</option>
                  {
                    departments.map(department =>
                      <option key={department.id} value={department.id}>{department.departmentName}</option>
                    )
                  }
                </select>
                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                Submit
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
