import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const getUsers = (page: number) => {
  return api.get(`/users?page=${page}`);
};

export const updateUser = (id: number, userData: any) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
};

export default api; 