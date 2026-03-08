import { AppProvider } from "./app/AppProvider";
import { SnackbarProvider } from "./snackbar/SnackbarProvider";
import type { ProviderProps } from "../util/util";
import { HomeProvider } from "./home/HomeProvider";

export const CombinedProviders: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SnackbarProvider>
      <AppProvider>
        <HomeProvider>{children}</HomeProvider>
      </AppProvider>
    </SnackbarProvider>
  );
};
