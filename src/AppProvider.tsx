import React from "react";
import { WalletConnectorProvider } from "./providers/WalletConnector";
import { IntercomProvider } from "./providers/IntercomProvider";
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <IntercomProvider>
      <WalletConnectorProvider>{children}</WalletConnectorProvider>
    </IntercomProvider>
  );
};
