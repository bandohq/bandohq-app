import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  safeWallet,
  zerionWallet,
  phantomWallet,
  rabbyWallet
} from "@rainbow-me/rainbowkit/wallets";
import { BANDO_API_ROUTE } from "../utils/consts";
import nativeTokenCatalog from "../utils/nativeTokenCatalog";
import { transformToChainConfig } from "../utils/TransformToChainConfig";

const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        walletConnectWallet,
        zerionWallet,
        phantomWallet,
        rabbyWallet,
        rainbowWallet,
        metaMaskWallet,
        safeWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: "Bando | Buy Anything from your wallet",
    projectId: "044601f65212332475a09bc14ceb3c34",
  }
);

export const WalletConnectorProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  const fetchActiveChains = async () => {
    const response = await fetch(`${BANDO_API_ROUTE}networks/`);
    const { data: networks } = (await response.json()) || [];
    const activeNetworks = networks.filter((network) => network.isActive);
    return activeNetworks;
  };

  useEffect(() => {
    const setupChains = async () => {
      const activeNetworks = await fetchActiveChains();

      const chainDefinitions = activeNetworks.map((network) => {
        const nativeToken = nativeTokenCatalog.find(
          (token) => token.key === network.key
        );
        return transformToChainConfig(network, nativeToken);
      });

      const wagmiConfig = createConfig({
        connectors,
        // @ts-ignore format based on viem docs
        chains: [...chainDefinitions],
        transports: chainDefinitions.reduce((acc, chain) => {
          acc[chain.id] = http();
          return acc;
        }, {}),
      });

      setConfig(wagmiConfig);
    };

    setupChains();
  }, []);

  if (!config) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
