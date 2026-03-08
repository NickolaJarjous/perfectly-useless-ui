import { useReducer } from "react";
import type { ProviderProps } from "../../util/util";
import type { Subscription } from "../../api/models/subscription";
import { HomeContext } from "./HomeContext";
import HomeReducer from "./HomeReducer";

export interface HomeStateType {
  selectedPricing?: Subscription;
}

const initialState: HomeStateType = {
  selectedPricing: undefined,
};

export const HomeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(HomeReducer, initialState);

  // Actions
  const setPricing = (value: Subscription) => {
    dispatch({
      type: "SET_PRICING",
      payload: value,
    });
  };

  return (
    <HomeContext.Provider
      value={{
        state,
        setPricing,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
