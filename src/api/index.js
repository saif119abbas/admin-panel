import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          console.error('Unauthorized access - please log in');
          break;
        case 403:
          console.error('Forbidden - insufficient permissions');
          break;
        case 404:
          console.error('Requested resource not found');
          break;
        case 500:
          console.error('Server error - please try again later');
          break;
        default:
          console.error('Request failed with status:', response.status);
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.error('Error details:', {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          headers: response.headers,
        });
      }
    } else if (error.request) {
      console.error('No response received from server. Please check your connection.');
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;