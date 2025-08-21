import React, { lazy, Suspense } from "react";
import { WalletConnectorProvider } from "./providers/WalletConnector";
import { IntercomProvider } from "./providers/IntercomProvider";
import { useIsWorldApp } from "./hooks/walletDetect";

// Lazy load MiniKitProvider only when needed
const MiniKitProvider = lazy(() =>
  import("@worldcoin/minikit-js/minikit-provider").then((module) => ({
    default: module.MiniKitProvider,
  }))
);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const isWorldApp = useIsWorldApp();

  if (isWorldApp) {
    return (
      <Suspense
        fallback={
          <IntercomProvider>
            <WalletConnectorProvider>{children}</WalletConnectorProvider>
          </IntercomProvider>
        }
      >
        <MiniKitProvider
          props={{
            appId: process.env.WORLDAPP_ID,
          }}
        >
          <IntercomProvider>
            <WalletConnectorProvider>{children}</WalletConnectorProvider>
          </IntercomProvider>
        </MiniKitProvider>
      </Suspense>
    );
  }

  return (
    <IntercomProvider>
      <WalletConnectorProvider>{children}</WalletConnectorProvider>
    </IntercomProvider>
  );
};
