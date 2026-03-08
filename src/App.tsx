import { useEffect } from "react";
import useScrollToTop from "./hooks/useScrollToTop";
import { Route, Routes } from "react-router-dom";
import { CombinedProviders } from "./context/CombinedProviders";
import Index from "./components/pages/index/Index";
import LoginPage from "./components/pages/login/LoginPage";

function App() {
  useScrollToTop();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const { history } = window;
      const previous = history.scrollRestoration;
      history.scrollRestoration = "manual";
      return () => {
        history.scrollRestoration = previous;
      };
    }
  }, []);

  return (
    <>
      <CombinedProviders>
        <Routes>
          <Route path={"/"} element={<Index />} />
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
      </CombinedProviders>
    </>
  );
}

export default App;
