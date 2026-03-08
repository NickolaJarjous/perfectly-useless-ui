import { useEffect, useReducer, type ReactNode } from "react";
import AppReducer from "./AppReducer";
import { AppContext } from "./AppContext";
import type { User } from "../../modes/user";

export interface AppStateType {
  language: string;
  isDarkMode: boolean;
  stopScroll: boolean;
  user?: User;
  isLoggedIn: boolean;
}

const defaultLanguage = "en";

const initialState: AppStateType = {
  language: defaultLanguage,
  isDarkMode: false,
  stopScroll: false,
  user: undefined,
  isLoggedIn: false,
};

const getInitialState = (): AppStateType => {
  const savedState = localStorage.getItem("appState");
  const parsed = savedState ? JSON.parse(savedState) : {};
  const merged = { ...initialState, ...parsed };
  return { ...merged };
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AppReducer, getInitialState());

  // Save state to localStorage
  useEffect(() => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stopScroll,
      ...stateToPersist
    } = state;
    localStorage.setItem("appState", JSON.stringify(stateToPersist));
  }, [state]);

  // Actions
  const setLanguage = (value: string) => {
    dispatch({
      type: "SET_LANGUAGE",
      payload: value,
    });
  };

  const setIsDarkMode = (value: boolean) => {
    dispatch({
      type: "SET_IS_DARK_MODE",
      payload: value,
    });
  };

  const setStopScroll = (value: boolean) => {
    dispatch({
      type: "SET_STOP_SCROLL",
      payload: value,
    });
  };

  const setUser = (value?: User) => {
    dispatch({
      type: "SET_USER",
      payload: value,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setLanguage,
        setIsDarkMode,
        setStopScroll,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
