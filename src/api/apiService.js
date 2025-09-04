import api from ".";

export  const apiService = {
  async get(endpoint, token = null) {
    try {
  
      
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      
      const response = await api.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} error:`, error.message);
      throw error;
    }
  },

  // GET request with query params
  async getWithQuery(endpoint, queryParams = {}, token = null) {
    try {
    
      
      const config = { params: queryParams };
      if (token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      }
      
      const response = await api.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} with query error:`, error.message);
      throw error;
    }
  },

  // POST request with JSON data
  async post(endpoint, data, token = null) {
    try {
    
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      
      const response = await api.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} error:`, error.message);
      throw error;
    }
  },

  // POST request with file uploads (multipart/form-data)
  async postWithFiles(endpoint, formData, token = null) {
    try {     
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await api.post(endpoint, formData, config);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} with files error:`, error.message);
      throw error;
    }
  },

  // PUT/PATCH request
  async put(endpoint, data = null, token = null) {
    try {      
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      
      const response = await api.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} error:`, error.message);
      throw error;
    }
  },

  // PATCH request
  async patch(endpoint, data = null, token = null) {
    try {

      
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      
      const response = await api.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`PATCH ${endpoint} error:`, error.message);
      throw error;
    }
  },

  // DELETE request
  async delete(endpoint, token = null) {
    try {
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      
      const response = await api.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${endpoint} error:`, error.message);
      throw error;
    }
  },

  // Helper method to create FormData for file uploads
  createFormData: (data, files, fileFieldName = 'files') => {
    const formData = new FormData();
    
    // Append JSON data
    if (data) {
      formData.append('data', JSON.stringify(data));
    }
    
    // Append files
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