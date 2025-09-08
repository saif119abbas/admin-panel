import { apiService } from '../api/apiService';

import { UsersListDto } from "../dtos/settingsDto/usersListDto";
import { StatisticsDto } from "../dtos/settingsDto/statisticsDto";
import lookupService from './lookupService';

class SettingsService {
  async getUsers(filter) {

    try {
      const usersListDto = []
      const response = await apiService.post('/users', {});
      const users = response.data.items;
      for (let index = 0; index < users.length; index++) {
        const element = users[index];
        const userDto = new UsersListDto();
        userDto.id = element.id;
        userDto.firstName = element.firstName;
        userDto.lastName = element.lastName;
        userDto.country = element.country;
        userDto.city = element.city;
        userDto.countryName = await lookupService.getCountryNameById(element.country);
        userDto.cityName = await lookupService.getCityNameById(element.city);
        userDto.email = element.email;
        userDto.birthdate = element.birthdate;
        userDto.mobileNumber = element.mobileNumber;
        userDto.role = element.type;
        userDto.status = element.status;
        userDto.image = element.image;
        usersListDto.push(userDto);
      }
      return usersListDto;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getStatistics() {
    try {
      const response = await apiService.get(`/Users/Statistics`);
      return new StatisticsDto(response.data)
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return null;
    }
  }

  async createUser(userData) {
    try {
      console.log("createUser",userData)
      return await apiService.post('/Users/Auth/Signup', userData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      return await apiService.put(`/users/${userId}`, userData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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

const settingsService = new SettingsService();
export default settingsService;
