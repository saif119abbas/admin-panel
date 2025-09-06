import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { apiService } from '../api/apiService';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "login/pending":
      return { ...state, isLoading: true, error: null };
    case "login/success":
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      };
    case "login/error":
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: action.payload 
      };
    case "logout":
      return { ...initialState };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = useCallback(async (email, password) => {
    try {
      dispatch({ type: "login/pending" });
      
      const response = await apiService.post('/Users/Auth/Login', {
        userName: email,
        password: password
      });
      
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }
      
      const { data: userData } = response;
      
      // Store the token in localStorage
      if (userData?.token) {
        localStorage.setItem('token', userData.token);
        // You might want to store user data in localStorage as well
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      dispatch({ 
        type: "login/success", 
        payload: userData 
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      dispatch({ 
        type: "login/error", 
        payload: errorMessage 
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    // Clear the token and user data from storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: "logout" });
  }, []);

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        dispatch({ 
          type: "login/success", 
          payload: parsedUser 
        });
      } catch (error) {
        console.error('Failed to parse user data', error);
        logout();
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      error,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
