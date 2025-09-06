// src/context/UserContext.jsx
import React, { createContext, useContext, useReducer, useCallback, useEffect, useState } from 'react';
import userService from '../services/userService';
import lookupService from '../services/lookupService';

const USER_ACTIONS = {
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_PAGINATION: 'SET_PAGINATION',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_CITIES: 'SET_CITIES'
};

const initialState = {
  users: [],
  loading: false,
  error: null,
  searchTerm: '',
  countries: [],
  cities: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1
  }
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

    case USER_ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };

    case USER_ACTIONS.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
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

    case USER_ACTIONS.SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        error: null
      };

    case USER_ACTIONS.SET_CITIES:
      return {
        ...state,
        cities: action.payload,
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
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const { pageNumber, pageSize } = state.pagination;

  // Fetch users from API
  const fetchUsers = useCallback(async (page = pageNumber, size = pageSize, filters = {}) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      const response = await userService.getUsers(page, size, filters);
      
      if (response.success) {
        const { items, ...pagination } = response.data;
        dispatch({ type: USER_ACTIONS.SET_USERS, payload: items });
        dispatch({ type: USER_ACTIONS.SET_PAGINATION, payload: pagination });
      } else {
        dispatch({ 
          type: USER_ACTIONS.SET_ERROR, 
          payload: response.error || 'Failed to load users' 
        });
      }
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.SET_ERROR, 
        payload: error.message || 'An error occurred while fetching users' 
      });
    }
  }, [pageNumber, pageSize]);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search term
  const filteredUsers = useCallback(() => {
    if (!state.searchTerm) return state.users;
    
    const term = state.searchTerm.toLowerCase();
    return state.users.filter(user => 
      user.fullName?.toLowerCase().includes(term) || 
      user.email?.toLowerCase().includes(term) ||
      user.userRole?.toLowerCase().includes(term)
    );
  }, [state.users, state.searchTerm]);

  // Calculate user statistics
  const getUserStats = useCallback(() => {
    return state.users.reduce((acc, user) => {
      acc.totalUsers = (acc.totalUsers || 0) + 1;
      acc.activeUsers = (acc.activeUsers || 0) + (user.status === 1 ? 1 : 0);
      acc[user.userRole?.toLowerCase()] = (acc[user.userRole?.toLowerCase()] || 0) + 1;
      return acc;
    }, {});
  }, [state.users]);

  // Get user role display name
  const getUserRoleDisplayName = (type) => {
    const roleMap = {
      0: 'Super Admin',
      1: 'Admin',
      2: 'Marketing',
      3: 'Customer Support',
      '0': 'Super Admin',
      '1': 'Admin',
      '2': 'Marketing',
      '3': 'Customer Support'
    };
    return roleMap[type] || `Type ${type}`;
  };

  // Get user role enum value for API
  const getUserRoleEnumValue = (roleString) => {
    const enumMap = {
      'Super Admin': 0,
      'Admin': 1,
      'Marketing': 2,
      'Customer Support': 3,
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3
    };
    return enumMap[roleString] !== undefined ? enumMap[roleString] : parseInt(roleString) || 0;
  };

  // Get user status display name
  const getUserStatusDisplayName = (status) => {
    const statusMap = {
      'Active': 'Active',
      'Inactive': 'Inactive',
      '0': 'Inactive',
      '1': 'Active',
      0: 'Inactive',
      1: 'Active'
    };
    return statusMap[status] || status;
  };

  // Get user status enum value
  const getUserStatusEnumValue = (statusString) => {
    const enumMap = {
      'Active': 1,
      'Inactive': 0
    };
    return enumMap[statusString] !== undefined ? enumMap[statusString] : statusString;
  };

  // Handle search term change
  const setSearchTerm = useCallback((term) => {
    dispatch({ type: USER_ACTIONS.SET_SEARCH_TERM, payload: term });
  }, []);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    fetchUsers(newPage, pageSize);
  }, [fetchUsers, pageSize]);

  // Handle page size change
  const handlePageSizeChange = useCallback((newSize) => {
    fetchUsers(1, newSize);
  }, [fetchUsers]);

  // Handle user deletion
  const deleteUser = useCallback(async (userId) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      
      // Call the actual delete user API
      const response = await userService.deleteUser(userId);
      
      if (response.success !== false) {
        // Remove user from local state after successful API call
        dispatch({ type: USER_ACTIONS.DELETE_USER, payload: userId });
      } else {
        throw new Error(response.message || 'Failed to delete user');
      }
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.SET_ERROR, 
        payload: error.message || 'Failed to delete user' 
      });
      throw error;
    } finally {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Add user
  const addUser = useCallback(async (userData) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      // TODO: Call add user API when available
      // const response = await userService.addUser(userData);
      
      // For now, create a mock user with ID
      const newUser = {
        id: Date.now().toString(),
        fullName: userData.firstName + ' ' + userData.lastName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthdate: userData.birthdate,
        status: userData.status,
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      dispatch({ type: USER_ACTIONS.ADD_USER, payload: newUser });
      return newUser;
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.SET_ERROR, 
        payload: error.message || 'Failed to add user' 
      });
      throw error;
    }
  }, []);

  // Update user
  const updateUser = useCallback(async (userId, userData) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      // TODO: Call update user API when available
      // const response = await userService.updateUser(userId, userData);
      
      // For now, create updated user data
      const updatedUser = {
        fullName: userData.firstName + ' ' + userData.lastName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthdate: userData.birthdate,
        status: userData.status,
        ...userData,
        id: userId,
        updatedAt: new Date().toISOString()
      };
      
      dispatch({ type: USER_ACTIONS.UPDATE_USER, payload: updatedUser });
      return updatedUser;
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.SET_ERROR, 
        payload: error.message || 'Failed to update user' 
      });
      throw error;
    }
  }, []);

  // Validate user data
  const validateUserData = useCallback((userData, isCreating = false) => {
    const errors = {};
    
    // First Name validation
    if (!userData.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    
    // Last Name validation
    if (!userData.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    // Birthdate validation
    if (!userData.birthdate?.trim()) {
      errors.birthdate = 'Birth date is required';
    }
    
    // Email validation
    if (!userData.emailAddress?.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.emailAddress.trim())) {
      errors.emailAddress = 'Please enter a valid email address';
    }
    
    // Phone number validation - exactly 9 digits
    if (!userData.mobileNumber?.trim()) {
      errors.mobileNumber = 'Phone number is required';
    } else if (!/^\d{9}$/.test(userData.mobileNumber.trim())) {
      errors.mobileNumber = 'Phone number must be exactly 9 digits';
    }
    
    // Country validation
    if (!userData.country) {
      errors.country = 'Country is required';
    }
    
    // City validation
    if (!userData.city) {
      errors.city = 'City is required';
    }
    
    // User Role validation - check for both string and number values
    if (userData.userRole === '' || userData.userRole === null || userData.userRole === undefined) {
      errors.userRole = 'User role is required';
    }

    // Password validation for new user creation
    if (isCreating) {
      if (!userData.password?.trim()) {
        errors.password = 'Password is required';
      } else if (userData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      
      if (!userData.confirmPassword?.trim()) {
        errors.confirmPassword = 'Confirm password is required';
      } else if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  }, []);

  // Fetch countries
  const fetchCountries = useCallback(async () => {
    if (state.countries.length > 0) return; // Skip if already loaded
    
    setIsLoadingCountries(true);
    try {
      const response = await lookupService.countryCityLookupService.getCountriesWithCities();
      if (response.success) {
        dispatch({ type: USER_ACTIONS.SET_COUNTRIES, payload: response.data || [] });
      } else {
        dispatch({ 
          type: USER_ACTIONS.SET_ERROR, 
          payload: response.error || 'Failed to load countries. Please try again later.' 
        });
      }
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.SET_ERROR, 
        payload: 'Failed to load countries. Please try again later.' 
      });
    } finally {
      setIsLoadingCountries(false);
    }
  }, [state.countries.length]);

  // Fetch cities for a country
  const fetchCitiesByCountry = useCallback(async (countryId) => {
    if (!countryId) {
      dispatch({ type: USER_ACTIONS.SET_CITIES, payload: [] });
      return;
    }
    
    setIsLoadingCities(true);
    try {
      const cities = await lookupService.countryCityLookupService.getCitiesByCountryId(countryId, state.countries);
      dispatch({ type: USER_ACTIONS.SET_CITIES, payload: cities || [] });
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.SET_CITIES, 
        payload: [] 
      });
      dispatch({ 
        type: USER_ACTIONS.SET_ERROR, 
        payload: 'Failed to load cities. Please try again later.' 
      });
    } finally {
      setIsLoadingCities(false);
    }
  }, [state.countries]);

  // Get country name by ID
  const getCountryName = useCallback((countryId) => {
    if (!countryId) return '';
    return lookupService.countryCityLookupService.getCountryNameById(countryId, state.countries);
  }, [state.countries]);

  // Get city name by ID
  const getCityName = useCallback((cityId) => {
    if (!cityId) return '';
    return lookupService.countryCityLookupService.getCityNameById(cityId, state.countries);
  }, [state.countries]);

  const value = {
    ...state,
    users: state.users,
    filteredUsers: filteredUsers(),
    loading: state.loading,
    error: state.error,
    searchTerm: state.searchTerm,
    pagination: state.pagination,
    isLoadingCountries,
    isLoadingCities,
    setSearchTerm,
    deleteUser,
    addUser,
    updateUser,
    validateUserData,
    getUserRoleDisplayName,
    getUserRoleEnumValue,
    getUserStatusDisplayName,
    getUserStatusEnumValue,
    getUserStats,
    handlePageChange,
    handlePageSizeChange,
    refreshUsers: () => fetchUsers(pageNumber, pageSize),
    clearError,
    fetchCountries,
    fetchCitiesByCountry,
    getCountryName,
    getCityName
  };

  // Load countries when component mounts
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;