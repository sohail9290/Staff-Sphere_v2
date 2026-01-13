import axios from "axios";
const REST_API_URL = "https://staff-sphere-v2.onrender.com/api/departments";

export const getAllDepartments = () => {
    return axios.get(REST_API_URL);
};

export const createDepartment = (department) => {
    return axios.post(REST_API_URL, department);
}

export const getDepartment = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

export const updateDepartment = (id, department) => {
    return axios.put(`${REST_API_URL}/${id}`, department);
}

export const deleteDepartment = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}
