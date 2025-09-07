// src/context/UserContext.jsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';

const USER_ACTIONS = {
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

const initialState = {
  users: [],
  loading: false,
  error: null,
  searchTerm: ''
};

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null
      };

    case USER_ACTIONS.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
        error: null
      };

    case USER_ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
        error: null
      };

    case USER_ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        loading: false,
        error: null
      };

    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case USER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case USER_ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };

    case USER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUsers = useCallback((users) => {
    dispatch({ type: USER_ACTIONS.SET_USERS, payload: users });
  }, []);

  const addUser = useCallback((userData) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      const newUser = {
        ...userData,
        id: Date.now(), // Simple ID generation need to be edit and use real user ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      dispatch({ type: USER_ACTIONS.ADD_USER, payload: newUser });
      return newUser;
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const updateUser = useCallback((userId, userData) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      const updatedUser = {
        ...userData,
        id: userId,
        updatedAt: new Date().toISOString()
      };

      dispatch({ type: USER_ACTIONS.UPDATE_USER, payload: updatedUser });
      return updatedUser;
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const deleteUser = useCallback((userId) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: USER_ACTIONS.DELETE_USER, payload: userId });
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  const setSearchTerm = useCallback((searchTerm) => {
    dispatch({ type: USER_ACTIONS.SET_SEARCH_TERM, payload: searchTerm });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  }, []);
  

  // Advanced search function that searches across all user fields
  const searchUsers = useCallback((searchTerm = state.searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return state.users;
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    
    return state.users.filter(user => {
      // Define all searchable fields
      const searchableFields = [
        user.firstName,
        user.lastName,
        user.name,
        user.emailAddress,
        user.phoneNumber,
        user.country,
        user.countryDisplay,
        user.city,
        user.cityDisplay,
        user.userRole,
        // Map userRole to display names for search
        getUserRoleDisplayName(user.userRole)
      ];

      // Check if any field contains the search term
      return searchableFields.some(field => {
        if (!field) return false;
        return field.toString().toLowerCase().includes(normalizedSearchTerm);
      });
    });
  }, [state.users, state.searchTerm]);

  // Helper function to get user role display name
  const getUserRoleDisplayName = useCallback((userRole) => {
    const roleMap = {
      'superadmin': 'Super Admin',
      'admin': 'Admin', 
      'marketing': 'Marketing',
      'customersupport': 'Customer Support'
    };
    return roleMap[userRole] || userRole;
  }, []);

  // Get user statistics
  const getUserStats = useCallback(() => {
    const totalUsers = state.users.length;
    const activeUsers = state.users.filter(user => user.status === true).length;
    const inactiveUsers = totalUsers - activeUsers;
        const roleStats = {
      superadmin: state.users.filter(user => user.userRole === 'superadmin').length,
      admin: state.users.filter(user => user.userRole === 'admin').length,
      marketing: state.users.filter(user => user.userRole === 'marketing').length,
      customersupport: state.users.filter(user => user.userRole === 'customersupport').length
    };

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      ...roleStats
    };
  }, [state.users]);

  // Find user by ID
  const findUserById = useCallback((userId) => {
    return state.users.find(user => user.id === userId);
  }, [state.users]);

  // Validate user data
  const validateUserData = useCallback((userData) => {
    const errors = {};

    if (!userData.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!userData.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!userData.emailAddress?.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }
    if (!userData.phoneNumber?.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    if (!userData.country) {
      errors.country = 'Country is required';
    }
    if (!userData.city) {
      errors.city = 'City is required';
    }
    if (!userData.userRole) {
      errors.userRole = 'User role is required';
    }

    // Check for duplicate email
    const existingUser = state.users.find(user => 
      user.emailAddress?.toLowerCase() === userData.emailAddress?.toLowerCase() &&
      user.id !== userData.id
    );
    if (existingUser) {
      errors.emailAddress = 'This email address is already in use';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [state.users]);

  // Context value
  const value = {
    // State
    users: state.users,
    loading: state.loading,
    error: state.error,
    searchTerm: state.searchTerm,
    
    // Actions
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    setSearchTerm,
    clearError,
    
    // Computed values and utilities
    searchUsers,
    getUserStats,
    findUserById,
    validateUserData,
    getUserRoleDisplayName,
    
    // Filtered users based on current search term
    filteredUsers: searchUsers()
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default {UserContext};