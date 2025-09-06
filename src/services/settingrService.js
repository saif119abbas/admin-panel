import { apiService } from '../api/apiService';

class UserService {
  constructor() { }

  async fetchUsers() {
    try {
      return []
      return await apiService.get('/users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      return await apiService.post('/users', userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      return await apiService.put(`/users/${userId}`, userData);
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      return await apiService.delete(`/users/${userId}`);
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  }

  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await apiService.post('/users/avatar', formData);
      return await response.json();
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  }
}

export default new UserService();
