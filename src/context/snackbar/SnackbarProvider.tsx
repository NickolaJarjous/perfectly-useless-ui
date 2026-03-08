import { useCallback, useState, type ReactNode } from "react";
import { SnackbarContext } from "./SnackbarContext";

type SnackbarType = {
  message: string;
  isVisible: boolean;
  type: string;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarType>({
    message: "",
    isVisible: false,
    type: "",
  });

  const showSnackbar = useCallback((message: string, type: string) => {
    setSnackbar({ message, isVisible: true, type });
    setTimeout(() => {
      setSnackbar({ message: "", isVisible: false, type: "" });
    }, 3000);
  }, []);

  const showSuccess = useCallback(
    (message: string) => showSnackbar(message, "success"),
    [showSnackbar],
  );
  const showError = useCallback(
    (message: string) => showSnackbar(message, "error"),
    [showSnackbar],
  );

  return (
    <SnackbarContext.Provider value={{ showSuccess, showError }}>
      {children}
      {snackbar.isVisible && (
        <div
          className={`fixed top-0 left-0 m-4 p-2 rounded-md shadow ${
            snackbar.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white font-bold z-50`}
        >
          {snackbar.message}
          <div className="w-full h-1 bg-gray-300 mt-2">
            <div className="h-full bg-white animate-timer"></div>
          </div>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
