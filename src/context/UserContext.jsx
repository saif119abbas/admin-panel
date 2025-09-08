import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import tipReceiverService from '../services/tipReceiverService';

const USER_ACTIONS = {
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_STATS: 'SET_STATS',
  SET_SELECTED_USER: 'SET_SELECTED_USER',
  REFRESH_SELECTED_USER: 'REFRESH_SELECTED_USER',
};

const initialState = {
  users: [],
  stats: { total: 0, activeUsers: 0, newUsers: 0 },
  selectedUser: null,
  loading: false,
  error: null,
  searchTerm: ''
};

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USERS:
      return { ...state, users: action.payload, loading: false, error: null };
    case USER_ACTIONS.ADD_USER:
      return { ...state, users: [...state.users, action.payload], loading: false, error: null };
    case USER_ACTIONS.UPDATE_USER:
      return { ...state, users: state.users.map(user => user.id === action.payload.id ? action.payload : user), loading: false, error: null };
    case USER_ACTIONS.DELETE_USER:
      return { ...state, users: state.users.filter(user => user.id !== action.payload), loading: false, error: null };
    case USER_ACTIONS.SET_STATS:
      return { ...state, stats: action.payload };
    case USER_ACTIONS.SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload };
    case USER_ACTIONS.REFRESH_SELECTED_USER:
      return { ...state, selectedUser: { ...state.selectedUser, ...action.payload } };
    case USER_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case USER_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case USER_ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case USER_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
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

  const setAllUsers = useCallback((users) => {
    dispatch({ type: USER_ACTIONS.SET_USERS, payload: users });
  }, []);

  const setStats = useCallback((stats) => {
    dispatch({ type: USER_ACTIONS.SET_STATS, payload: stats });
  }, []);

  const setSelectedUser = useCallback((user) => {
    dispatch({ type: USER_ACTIONS.SET_SELECTED_USER, payload: user });
  }, []);

  const refreshUser = useCallback(async (userId) => {
    dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
    try {
      const updatedUser = await tipReceiverService.getTipReceiverById(userId);
      if (updatedUser) {
        dispatch({ type: USER_ACTIONS.REFRESH_SELECTED_USER, payload: updatedUser });
      }
    } catch (error) {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const addUser = useCallback((userData) => {
    try {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });
      const newUser = {
        ...userData,
        id: Date.now(),
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

  const getUserRoleDisplayName = useCallback((userRole) => {
    const roleMap = {
      0: 'SuperAdmin',
      1: 'Admin',
      2: 'Marketing',
      3: 'CustomerSupport',
    };
    return roleMap[userRole] || userRole;
  }, []);

  const searchUsers = useCallback((searchTerm = state.searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      return state.users;
    }
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    return state.users.filter(user => {
      const searchableFields = [
        user.firstName, user.lastName, user.name, user.emailAddress,
        user.phoneNumber, user.country, user.birthdate, user.countryDisplay,
        user.city, user.userRole, getUserRoleDisplayName(user.userRole)
      ];
      return searchableFields.some(field => 
        field && field.toString().toLowerCase().includes(normalizedSearchTerm)
      );
    });
  }, [state.users, state.searchTerm, getUserRoleDisplayName]);

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
    return { totalUsers, activeUsers, inactiveUsers, ...roleStats };
  }, [state.users]);

  const findUserById = useCallback((userId) => {
    return state.users.find(user => user.id === userId);
  }, [state.users]);

  const validateUserData = useCallback((userData) => {
    const errors = {};
    if (!userData.firstName?.trim()) errors.firstName = 'First name is required';
    if (!userData.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!userData.emailAddress?.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }
    if (!userData.phoneNumber?.trim()) errors.phoneNumber = 'Phone number is required';
    if (!userData.country) errors.country = 'Country is required';
    if (!userData.city) errors.city = 'City is required';
    if (!userData.userRole) errors.userRole = 'User role is required';

    const existingUser = state.users.find(user => 
      user.emailAddress?.toLowerCase() === userData.emailAddress?.toLowerCase() &&
      user.id !== userData.id
    );
    if (existingUser) errors.emailAddress = 'This email address is already in use';

    return { isValid: Object.keys(errors).length === 0, errors };
  }, [state.users]);

  const value = useMemo(() => ({
    ...state,
    setAllUsers,
    setStats,
    setSelectedUser,
    refreshUser,
    addUser,
    updateUser,
    deleteUser,
    setSearchTerm,
    clearError,
    searchUsers,
    getUserStats,
    findUserById,
    validateUserData,
    getUserRoleDisplayName,
    filteredUsers: searchUsers(),
  }), [state, setAllUsers, setStats, setSelectedUser, refreshUser, addUser, updateUser, deleteUser, setSearchTerm, clearError, searchUsers, getUserStats, findUserById, validateUserData, getUserRoleDisplayName]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;