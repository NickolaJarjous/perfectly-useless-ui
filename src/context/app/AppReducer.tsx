import type { User } from "../../modes/user";
import type { AppStateType } from "./AppProvider";

type AppAction =
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_IS_DARK_MODE"; payload: boolean }
  | { type: "SET_STOP_SCROLL"; payload: boolean }
  | { type: "SET_USER"; payload?: User };

const AppReducer = (state: AppStateType, action: AppAction): AppStateType => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "SET_IS_DARK_MODE":
      return {
        ...state,
        isDarkMode: action.payload,
      };
    case "SET_STOP_SCROLL":
      return {
        ...state,
        stopScroll: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: action.payload !== undefined,
      };
    default:
      return state;
  }
};

export default AppReducer;
