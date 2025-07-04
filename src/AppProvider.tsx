import React from "react";
import { WalletConnectorProvider } from "./providers/WalletConnector";
import { IntercomProvider } from "./providers/IntercomProvider";
import { MiniKitProvider } from "@worldcoin/minikit-js/minikit-provider";
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MiniKitProvider
      props={{
        appId: process.env.WORLDAPP_ID,
      }}
    >
      <IntercomProvider>
        <WalletConnectorProvider>{children}</WalletConnectorProvider>
      </IntercomProvider>
    </MiniKitProvider>
  );
};
