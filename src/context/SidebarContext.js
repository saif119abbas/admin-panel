import { createContext, useContext, useReducer } from "react";

const SidebarContext = createContext();

const initialState = {
  currentView: "dashboard",
};

function reducer(state, action) {
  switch (action.type) {
    case "changeView":
      return { ...state, currentView: action.payload.currentView };
    default:
      throw new Error("Unknown action");
  }
}



function SidebarProvider({ children }) {
  const [{ currentView }, dispatch] = useReducer(
    reducer,
    initialState
  );

function changeView(view) 
{
  dispatch({ type: "changeView", payload: {currentView:view} });
}

  return (
    <SidebarContext.Provider value={{ currentView, changeView }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { SidebarProvider, useSidebar };
