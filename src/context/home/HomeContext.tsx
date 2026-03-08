import { createContext, useContext } from "react";
import type { HomeStateType } from "./HomeProvider";
import type { Subscription } from "../../api/models/subscription";

interface HomeContextType {
  state: HomeStateType;
  setPricing: (value: Subscription) => void;
}

export const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
