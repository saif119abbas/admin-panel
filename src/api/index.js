import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error:",error)
    return error
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
        console.log("error22:",error)
    if (error.response && error.response.status === 401) {
    }
     return error
  }
);

export default api;