import { createContext, useContext, useReducer } from "react";

const SettingsContext = createContext();

const initialState = {
  selectedUser: {},
  error:""  
};

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, selectedUser: action.payload.selectedUser };
    case "setError":
      return { ...state, error: action.payload.error };
    default:
      throw new Error("Unknown action");
  }
}

function SettingsProvider({ children }) {
  const [{ selectedUser, error }, dispatch] = useReducer(reducer, initialState);

  function changeUser(user) {
    dispatch({ type: "setUser", payload: { selectedUser: user } });
  }

  function changeError(errorObj) {
    dispatch({ type: "setError", payload: { error: errorObj } });
  }

  const validateUserData = (userData) => {
    const errors = {};

    if (!userData.firstName?.trim()) {
      console.log(userData.firstName)
      errors.firstName = "First name is required";
    }
    if (!userData.lastName?.trim()) {
       console.log(userData.lastName)
      errors.lastName = "Last name is required";
    }
    if (!userData.email?.trim()) {
      console.log(userData.email)
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!userData.mobileNumber?.trim()) {
       console.log(userData.mobileNumber)
      errors.mobileNumber = "Phone number is required";
    }
    if (!userData.countryId) {
        console.log(userData.countryId)
      errors.countryId = "Country is required";
    }
    if (!userData.cityId) {
        console.log(userData.cityId)
      errors.city = "City is required";
    }
    if (userData.role == null) {
         console.log(userData.role)
      errors.role = "User role is required";
    }

    console.log("errors===",errors);
     return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return (
    <SettingsContext.Provider
      value={{ selectedUser, error, changeUser, changeError, validateUserData }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("SettingsContext was used outside SettingsProvider");
  }
  return context;
}

export { SettingsProvider, useSettings };
