import { createContext, useContext, useReducer } from "react";

const MarketingContext = createContext();

const initialState = {
  templates:[],
};

function reducer(state, action) {
  switch (action.type) {
    case "changeView":
      return { ...state, currentView: action.payload.currentView };
    case "setTemplate":
      return { ...state, templates: action.payload.templates };
    default:
      throw new Error("Unknown action");
  }
}



function MarketingProvider({ children }) {
  const [{ templates},dispatch] = useReducer(
    reducer,
    initialState
  );

/*function changeView(view) 
{
  dispatch({ type: "changeView", payload: {currentView:view} });
}*/
function setTemplates(templates)
{
   dispatch({ type: "setTemplate", payload: {templates:templates} });
}

  return (
    <MarketingContext.Provider value={{ templates,setTemplates }}>
      {children}
    </MarketingContext.Provider>
  );
}

function useMarketing() {
  const context = useContext(MarketingContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { MarketingProvider, useMarketing };
