import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  withCredentials: true, // Crucial for sending/receiving cookies
});

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Local clean up if unauthorized
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;
