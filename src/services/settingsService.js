import { apiService } from '../api/apiService';

import { UsersListDto } from "../dtos/settingsDto/usersListDto";
import { StatisticsDto } from "../dtos/settingsDto/statisticsDto";

class SettingsService {
  // eslint-disable-next-line no-useless-constructor
  constructor() { }

  async getUsers(filter) {
    return [new UsersListDto()]
   /* try {
      return []
      return await apiService.get('/users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }*/
  }
  async getStatistics() {
      return new StatisticsDto()
      /*  try {
            const response = await apiService.get(`/TipReceiver/Statistics`);
            return response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
            return null;
        }*/
    }

  async createUser(userData) {
      console.log("userData==========",userData)
      return true
   /* try {
      console.log(userData)
      return await apiService.post('/users', userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }*/
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
    console.log("delete==",userId)
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

// eslint-disable-next-line import/no-anonymous-default-export
export default new SettingsService();
