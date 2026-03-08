import { createContext, useContext } from "react";
import type { AppStateType } from "./AppProvider";
import type { User } from "../../modes/user";

interface AppContextType {
  state: AppStateType;
  setLanguage: (value: string) => void;
  setIsDarkMode: (value: boolean) => void;
  setStopScroll: (value: boolean) => void;
  setUser: (value?: User) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
