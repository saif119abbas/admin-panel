// src/services/AuthService.js
import { apiService } from '../api/apiService';
const AuthService = {
  login: async (email, password, rememberMe = false) => {
    try {
      const response = await apiService.post(`/Users/Auth/Login`, { UserName: email, Password: password });
      if (response.success) {
        // Store token and user data based on rememberMe selection
        if (rememberMe) {
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("userData", JSON.stringify(response.data));
        } else {
          sessionStorage.setItem("authToken", response.token);
          sessionStorage.setItem("userData", JSON.stringify(response.data));
        }
        return response;
      } else {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
  },

  getToken: () => {
    return (
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    );
  },

  getStoredUserData: () => {
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    const token = AuthService.getToken();
    const userData = AuthService.getStoredUserData();
    return !!(token && userData);
  },

  getCurrentUser: () => {
    return AuthService.getStoredUserData();
  },

  verifyResetToken: async (userId, code) => {
    try {
      const response = await apiService.post(`/Users/Auth/VerifyResetPassword`, {
        Id: userId,
        ResetCode: code
      });
      return response;
    } catch (error) {
      return { success: false, message: 'Invalid or expired reset link.' };
    }
  },

  resetPassword: async (userId, code, newPassword, confirmPassword) => {
    try {
      const response = await apiService.post(`/Users/Auth/ResetPassword`, {
        Id: userId,
        RestCode: code,
        Password: newPassword,
        ConfirmPassword: confirmPassword

      });
      return response;
    } catch (error) {
      return { success: false, message: 'Failed to reset password. Please try again.' };
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiService.post(`/Users/Auth/ForgotPassword`, {
        Username: email
      });
      return response;
    } catch (error) {
      return { success: false, message: 'Failed to send reset password email. Please try again.' };
    }
  },
};

export default AuthService;