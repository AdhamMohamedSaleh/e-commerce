import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";

// Initial state
const initialState = {
  theme: "light",
  user: null,
  isSessionLoading: true,
  isLoading: false,
};

// Action types
const ACTIONS = {
  SET_THEME: "SET_THEME",
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  SESSION_LOADED: "SESSION_LOADED",
  SET_LOADING: "SET_LOADING",
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.LOGOUT:
      return { ...state, user: null };
    case ACTIONS.SESSION_LOADED:
      return { ...state, isSessionLoading: false };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Create context
export const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load theme and user from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme });

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch({ type: ACTIONS.SET_USER, payload: JSON.parse(savedUser) });
    }
    dispatch({ type: ACTIONS.SESSION_LOADED });
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // Actions
  const actions = {
    setTheme: (theme) => dispatch({ type: ACTIONS.SET_THEME, payload: theme }),
    setUser: (user) => dispatch({ type: ACTIONS.SET_USER, payload: user }),
    logout: () => dispatch({ type: ACTIONS.LOGOUT }),
    setLoading: (loading) =>
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    addNotification: (notification) => {
      const { type = "info", title, message } = notification;
      switch (type) {
        case "success":
          toast.success(title, { description: message });
          break;
        case "error":
          toast.error(title, { description: message });
          break;
        default:
          toast.info(title, { description: message });
          break;
      }
    },
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
