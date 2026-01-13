import axios from "axios";

const BASE_URL = "https://staff-sphere-v2.onrender.com/api/employees";

const auth = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
};

export const listEmployees = () => axios.get(BASE_URL, auth);
export const createEmployee = (e) => axios.post(BASE_URL, e, auth);
export const getEmployee = (id) => axios.get(`${BASE_URL}/${id}`, auth);
export const updateEmployee = (id, e) => axios.put(`${BASE_URL}/${id}`, e, auth);
export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`, auth);
