import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  theme: "light",
  user: null,
  isLoading: false,
  notifications: [],
};

// Action types
const ACTIONS = {
  SET_THEME: "SET_THEME",
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

// Create context
export const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme });
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  // Actions
  const actions = {
    setTheme: (theme) => dispatch({ type: ACTIONS.SET_THEME, payload: theme }),
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    setLoading: (loading) =>
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    addNotification: (notification) => {
      const id = Date.now();
      dispatch({
        type: ACTIONS.ADD_NOTIFICATION,
        payload: { ...notification, id },
      });
      // Auto remove after 5 seconds
      setTimeout(() => {
        dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id });
      }, 5000);
    },
    removeNotification: (id) =>
      dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id }),
  };

  const value = {
    ...state,
    ...actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
