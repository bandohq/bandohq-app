import React from "react";
import { WalletConnectorProvider } from "./providers/WalletConnector";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <WalletConnectorProvider>{children}</WalletConnectorProvider>;
};
