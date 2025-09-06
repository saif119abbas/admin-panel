import api from ".";
const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

if (!process.env.REACT_APP_API_BASE_URL) {
  console.warn('REACT_APP_API_BASE_URL is not set. Using empty string as base URL.');
}

export const apiService = {
  async get(endpoint) {
    try {
      const response = await api.get(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} error:`, error.response?.data || error.message);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await api.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} error:`, error.response?.data || error.message);
      throw error;
    }
  },

  async put(endpoint, data = null, headers = {}) {
    try {
      const response = await api.put(`${BASE_URL}${endpoint}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} error:`, error.response?.data || error.message);
      throw error;
    }
  },

  async patch(endpoint, data = null, headers = {}) {
    try {
      const response = await api.patch(`${BASE_URL}${endpoint}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error(`PATCH ${endpoint} error:`, error.response?.data || error.message);
      throw error;
    }
  },

  async delete(endpoint, headers = {}) {
    try {
      const response = await api.delete(`${BASE_URL}${endpoint}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`DELETE ${endpoint} error:`, error.response?.data || error.message);
      throw error;
    }
  },

  async postWithFiles(endpoint, formData, headers = {}) {
    try {
      // Don't set Content-Type header - let browser set it with proper boundary
      const response = await api.post(`${BASE_URL}${endpoint}`, formData, {
        headers
      });
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} with files error:`, error.response?.data || error.message);
      throw error;
    }
  },
  async getWithQuery(endpoint, queryParams = {}, headers = {}) {
    try {
      const config = { params: queryParams };
      const response = await api.get(`${BASE_URL}${endpoint}`, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} with query error:`, error.response?.data || error.message);
      throw error;
    }
  },
  createFormData(data, files, fileFieldName = 'files') {
    const formData = new FormData();
    if (data) {
      formData.append('data', JSON.stringify(data));
    }
    if (files) {
      if (Array.isArray(files)) {
        files.forEach((file, index) => {
          formData.append(`${fileFieldName}[${index}]`, file);
        });
      } else {
        formData.append(fileFieldName, files);
      }
    }
    return formData;
  }
};

export default apiService;