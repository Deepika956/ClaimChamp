import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // replace with your backend URL
});

// GET users
export const fetchUsers = () => API.get('/users');

// ADD user
export const addUser = (name) => API.post('/users', { name });

// CLAIM points
export const claimPoints = (userId) => API.post('/claim', { userId });

// GET claim history (optional)
export const getHistory = () => API.get('/history');
