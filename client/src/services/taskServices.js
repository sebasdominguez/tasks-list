import axios from 'axios';
const apiUrl = 'http://localhost:8080';

export function addTask(task) {
  return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
  return axios.put(`${apiUrl}/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export function getTasks(param) {
  return axios.get(`${apiUrl}/${param}`);
}
