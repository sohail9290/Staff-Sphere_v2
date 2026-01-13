import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartment, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');
    const { id } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getDepartment(id).then((response) => {
                const department = response.data;
                setDepartmentName(department.departmentName);
                setDepartmentDescription(department.departmentDescription);
            }).catch(error => {
                console.error('There was an error fetching the department!', error);
            });
        }
    }, [id]);

    function saveOrUpdateDepartment(e) {
        e.preventDefault();
        const department = { departmentName, departmentDescription };
        console.log(department);
        if (id) {
            updateDepartment(id, department).then((response) => {
                console.log('Department updated successfully', response.data);
                navigator('/departments');
            }).catch(error => {
                console.error('There was an error updating the department!', error);
            });
        }
        else {
            createDepartment(department).then((response) => {
                console.log('Department added successfully', response.data);
                navigator('/departments');
            }).catch(error => {
                console.error('There was an error adding the department!', error);
            });
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center mt-2'>Update Department</h2>
        } else {
            return <h2 className='text-center mt-2'>Add Department</h2>
        }
    }

    return (
        <div className='container mt-5 pt-4'><br /><br />
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Name</label>
                            <input
                                type='text'
                                placeholder='Enter Department Name'
                                name='departmentName'

                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                className="form-control"
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Description</label>
                            <input
                                type='text'
                                placeholder='Enter Department Description'
                                name='departmentDescription'
                                value={departmentDescription}
                                onChange={(e) => setDepartmentDescription(e.target.value)}
                                className="form-control"
                            >
                            </input>
                        </div>
                        <button className='btn btn-success mb-2' type='submit' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default DepartmentComponent;