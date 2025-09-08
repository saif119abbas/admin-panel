import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  allUsers: [],
  stats: {
    total: 0,
    activeUsers: 0,
    newUsers: 0
  },
  currentUser: null
}

function reducer(state, action) {
  switch (action.type) {
    case "setUsers":
      return { ...state, allUsers: action.payload.users };
    case "setStats":
      return { ...state, stats: action.payload.stats };
    case "setCurrentUser":
      return { ...state, currentUser: action.payload.currentUser };
    default:
      throw new Error("Unknown action");
  }
}



function UserProvider({ children }) {
  const [{ allUsers, stats, currentUser }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function setAllUsers(allUsers) {
    dispatch({ type: "setUsers", payload: { users: [...allUsers] } });
  }
  function setStats(stats) {
    dispatch({ type: "setStats", payload: { stats: stats } });
  }
  function setSelectedUser(currentUser) {
    dispatch({ type: "setCurrentUser", payload: { currentUser: currentUser } });
  }

  return (
    <UserContext.Provider value={{ allUsers, stats, currentUser, setAllUsers, setStats, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { useUser, UserProvider };
