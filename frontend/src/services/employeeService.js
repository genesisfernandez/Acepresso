import axios from "axios";

const API = "http://localhost:5000/api/employees";

const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });
const getToken    = ()      => localStorage.getItem("token");

export const getEmployees    = ()        => axios.get(API,              { headers: authHeaders(getToken()) });
export const createEmployee  = (data)    => axios.post(API, data,        { headers: authHeaders(getToken()) });
export const updateEmployee  = (id, data)=> axios.put(`${API}/${id}`, data, { headers: authHeaders(getToken()) });
export const deleteEmployee  = (id)      => axios.delete(`${API}/${id}`,{ headers: authHeaders(getToken()) });