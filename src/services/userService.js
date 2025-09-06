import { apiService } from '../api/apiService';

const userService = {
  async getUsers(pageNumber = 1, pageSize = 10, filters = {}) {
    try {
      const response = await apiService.post('/Users', {
        params: {
          pageNumber,
          pageSize,
          ...filters
        }
      });

      if (response.success) {
        return {
          success: true,
          data: response.data,
          error: null
        };
      }

      return {
        success: false,
        data: null,
        error: response.message || 'Failed to fetch users'
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch users. Please try again.'
      };
    }
  },
  async updateUserProfile(userId, userData) {
    try {
      const formData = new FormData();
      formData.append('Id', userId);
      if (userData.type !== undefined && userData.type !== null) {
        formData.append('type', String(userData.type));
      }
      if (userData.firstName && userData.firstName.trim()) {
        formData.append('firstName', userData.firstName.trim());
      }
      if (userData.lastName && userData.lastName.trim()) {
        formData.append('lastName', userData.lastName.trim());
      }
      if (userData.birthdate && userData.birthdate.trim()) {
        formData.append('birthdate', userData.birthdate.trim());
      }
      if (userData.countryId && userData.countryId.trim()) {
        formData.append('countryId', userData.countryId.trim());
      }
      if (userData.cityId && userData.cityId.trim()) {
        formData.append('cityId', userData.cityId.trim());
      }
      if (userData.mobileNumber && userData.mobileNumber.trim()) {
        formData.append('mobileNumber', userData.mobileNumber.trim());
      }
      if (userData.status !== undefined && userData.status !== null) {
        formData.append('status', String(userData.status));
      }
      if (userData.image) {
        formData.append('image', userData.image);
      }

      const response = await apiService.put(`/users/${userId}`, formData, {
        'Content-Type': 'multipart/form-data',
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
  async createUser(userData) {
    try {
      console.log('Creating user with data:', userData);

      const formData = new FormData();
      if (userData.type !== undefined && userData.type !== null) {
        formData.append('type', String(userData.type));
      }
      if (userData.firstName && userData.firstName.trim()) {
        formData.append('firstName', userData.firstName.trim());
      }
      if (userData.lastName && userData.lastName.trim()) {
        formData.append('lastName', userData.lastName.trim());
      }
      if (userData.birthdate && userData.birthdate.trim()) {
        formData.append('birthdate', userData.birthdate.trim());
      }
      if (userData.countryId && userData.countryId.trim()) {
        formData.append('countryId', userData.countryId.trim());
      }
      if (userData.cityId && userData.cityId.trim()) {
        formData.append('cityId', userData.cityId.trim());
      }
      if (userData.mobileNumber && userData.mobileNumber.trim()) {
        formData.append('mobileNumber', userData.mobileNumber.trim());
      }
      if (userData.email && userData.email.trim()) {
        formData.append('email', userData.email.trim());
      }
      if (userData.password && userData.password.trim()) {
        formData.append('password', userData.password.trim());
      }
      if (userData.confirmPassword && userData.confirmPassword.trim()) {
        formData.append('confirmPassword', userData.confirmPassword.trim());
      }
      if (userData.status !== undefined && userData.status !== null) {
        formData.append('status', String(userData.status));
      }

      if (userData.image) {
        formData.append('image', userData.image);
      }
      const response = await apiService.postWithFiles('/Users/Auth/Signup', formData, {
        'Content-Type': 'multipart/form-data'
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  async deleteUser(userId) {
    try {
      const response = await apiService.delete(`/Users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};
export default userService;
