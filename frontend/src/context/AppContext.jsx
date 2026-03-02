import { createContext, useContext, useReducer, useEffect } from "react";
import { getSummary } from "../api/client";

const AppContext = createContext();

const initialState = {
  summary: { totalReceivable: 0, totalPayable: 0, netBalance: 0, overdueCount: 0 },
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SUMMARY":
      return { ...state, summary: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refreshSummary = async () => {
    try {
      const { data } = await getSummary();
      dispatch({ type: "SET_SUMMARY", payload: data });
    } catch {
      // silently fail — dashboard will show zeros
    }
  };

  useEffect(() => {
    refreshSummary();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, refreshSummary }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
