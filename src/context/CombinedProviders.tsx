import type { ReactNode } from "react";
import { AppProvider } from "./app/AppProvider";
import { SnackbarProvider } from "./snackbar/SnackbarProvider";

export const CombinedProviders: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <SnackbarProvider>
      <AppProvider>{children}</AppProvider>
    </SnackbarProvider>
  );
};
