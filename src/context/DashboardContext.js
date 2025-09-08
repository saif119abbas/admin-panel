import { createContext, useContext, useReducer } from "react";

const DashboardContext = createContext();

const initialState = {
  totalUsers: 0,
  activeUsers: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setTotalUsers":
      return { ...state, totalUsers: action.payload.totalUsers };
    case "setActiveUsers":
      return { ...state, activeUsers: action.payload.activeUsers };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setTotalUsers(totalUsers) {
    dispatch({ type: "setTotalUsers", payload: { totalUsers } });
  }

  function setActiveUsers(activeUsers) {
    dispatch({ type: "setActiveUsers", payload: { activeUsers } });
  }

  return (
    <DashboardContext.Provider
      value={{
        totalUsers: state.totalUsers,
        activeUsers: state.activeUsers,
        setTotalUsers,
        setActiveUsers,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
}

export { DashboardProvider, useDashboard };
