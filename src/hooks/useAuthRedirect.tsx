import { useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  const redirectIfNotLoggedIn = async () => {
    const appState = JSON.parse(localStorage.getItem("appState") || "{}");
    const user = appState.user;
    if (!user) {
      await navigate("/login");
    }
  };

  const redirectIfLoggedIn = async () => {
    const appState = JSON.parse(localStorage.getItem("appState") || "{}");
    const user = appState.user;
    if (user) {
      await navigate("/");
    }
  };

  return { redirectIfNotLoggedIn, redirectIfLoggedIn };
};
