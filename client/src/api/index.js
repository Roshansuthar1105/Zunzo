import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Products API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/product/${id}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post('/products/add', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/product/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/product/${id}`);
  return response.data;
};

// Auth API
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Contact API
export const submitContact = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

// Admin API
export const getUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getUser = async (userId) => {
  const response = await api.get(`/admin/user/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.patch(`/admin/user/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/user/${userId}`);
  return response.data;
};

export const getContacts = async () => {
  const response = await api.get('/admin/contacts');
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete(`/admin/contact/${id}`);
  return response.data;
};

export default api;
