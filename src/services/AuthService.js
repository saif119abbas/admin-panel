// src/services/AuthService.js
import { USER_ROLES, ROLE_NAMES } from "../utils/rolePermissions";

// Mock user data with different roles for testing
const MOCK_USERS = {
  "user@example.com": {
    email: "user@example.com",
    password: "User@123",
    name: "Reema Seema",
    role: USER_ROLES.SUPER_ADMIN,
    roleName: ROLE_NAMES[USER_ROLES.SUPER_ADMIN],
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.support.token",
  },
};

// Simulate API call with delay
const fakeApiCall = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS[email.toLowerCase()];

      if (user && user.password === password) {
        resolve({
          success: true,
          token: user.token,
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
            roleName: user.roleName,
          },
        });
      } else {
        reject({
          success: false,
          message: "Invalid email or password",
        });
      }
    }, 1000)
  });
};


const decodeToken = (token) => {
  try {
    // In a real app, you'd decode the JWT token
    // For mock, we'll find the user by token
    for (const email in MOCK_USERS) {
      const user = MOCK_USERS[email];
      if (user.token === token) {
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          roleName: user.roleName,
        };
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

const AuthService = {
  login: async (email, password, rememberMe = false) => {
    try {
      const response = await fakeApiCall(email, password);

      if (response.success) {
        // Store token and user data based on rememberMe selection
        if (rememberMe) {
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("userData", JSON.stringify(response.user));
        } else {
          sessionStorage.setItem("authToken", response.token);
          sessionStorage.setItem("userData", JSON.stringify(response.user));
        }

        return response;
      }
    } catch (error) {
      throw error;
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

  getUserFromToken: (token) => {
    if (!token) return null;

    const storedData = AuthService.getStoredUserData();
    if (storedData) return storedData;

    return decodeToken(token);
  },

  getCurrentUser: () => {
    const token = AuthService.getToken();
    return AuthService.getUserFromToken(token);
  },
};

export default AuthService;