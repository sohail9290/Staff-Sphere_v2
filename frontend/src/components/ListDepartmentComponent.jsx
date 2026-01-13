import React, { useEffect, useState } from 'react'
import { getAllDepartments, deleteDepartment } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';


const ListDepartmentComponent = () => {
    const navigator = useNavigate();
    useEffect(() => {
        listOfDepartments();
    }, []);

    const [departments, setDepartments] = useState([]);

    function listOfDepartments() {
        getAllDepartments().then((response) => {
            console.log(response.data);
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        });
    }
    function updateDepartment(id) {
        navigator(`/edit-department/${id}`);
    }

    function removeDepartment(id) {
        deleteDepartment(id).then((response) => {
            console.log('Department deleted successfully', response.data);
            listOfDepartments();
        }).catch(error => {
            console.error('There was an error deleting the department!', error);
        });

    }
    return (
        <div className='container mt-5 pt-4'>
            <br />
            <h2 className='text-center'>List of Departments</h2>
            <br />
            <Link to='/add-department' className='btn btn-primary'>Add Department</Link>
            <br />
            <br />
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Department Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentDescription}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                                <button onClick={() => removeDepartment(department.id)} style={{ marginLeft: "10px" }} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListDepartmentComponent;