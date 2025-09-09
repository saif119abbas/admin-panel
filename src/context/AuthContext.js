// src/context/AuthContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "set_loading":
      return { ...state, isLoading: action.payload };
    case "check_auth":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        isLoading: false,
      };
    case "update_user":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = AuthService.isAuthenticated();
        let userData = null;

        if (isAuth) {
          // Get user data from stored data or token
          userData = AuthService.getCurrentUser();

          // If no user data found but token exists, clear auth
          if (!userData) {
            AuthService.logout();
          }
        }

        dispatch({
          type: "check_auth",
          payload: {
            isAuthenticated: isAuth && !!userData,
            user: userData,
          },
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        AuthService.logout();
        dispatch({
          type: "check_auth",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    checkAuth();
  }, []);

  async function login(email, password, rememberMe = false) {
    try {
      dispatch({ type: "set_loading", payload: true });
      const response = await AuthService.login(email, password, rememberMe);

      if (response.success) {
        dispatch({
          type: "login",
          payload: { user: response.data },
        });
      }

      return response;
    } catch (error) {
      dispatch({ type: "set_loading", payload: false });
      throw error;
    }
  }

  function logout() {
    AuthService.logout();
    dispatch({ type: "logout" });
  }

  function updateUser(userData) {
    dispatch({ type: "update_user", payload: userData });

    // update stored data
    const token = AuthService.getToken();
    if (token) {
      const rememberMe = !!localStorage.getItem("authToken");
      if (rememberMe) {
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...user, ...userData })
        );
      } else {
        sessionStorage.setItem(
          "userData",
          JSON.stringify({ ...user, ...userData })
        );
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };