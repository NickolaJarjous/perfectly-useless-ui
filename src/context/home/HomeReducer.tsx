import type { Subscription } from "../../api/models/subscription";
import type { HomeStateType } from "./HomeProvider";

type HomeAction = { type: "SET_PRICING"; payload: Subscription };

const HomeReducer = (
  state: HomeStateType,
  action: HomeAction
): HomeStateType => {
  switch (action.type) {
    case "SET_PRICING":
      return {
        ...state,
        selectedPricing: action.payload,
      };
    default:
      return state;
  }
};

export default HomeReducer;
