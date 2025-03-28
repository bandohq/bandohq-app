import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, http, WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { BANDO_API_ROUTE } from "../utils/consts";

const queryClient = new QueryClient();

const fetchActiveChains = async () => {
  const response = await fetch(`${BANDO_API_ROUTE}networks/`);
  const networks = await response.json();
  return networks.filter((network) => network.isActive);
};

export const WalletConnectorProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const setupChains = async () => {
      const activeNetworks = await fetchActiveChains();

      const chainDefinitions = activeNetworks.map((network) => ({
        id: network.chainId,
        name: network.name,
        nativeCurrency: network.nativeCurrency,
        rpcUrls: {
          default: { http: [network.rpcUrl] },
        },
        blockExplorers: network.blockExplorer
          ? {
              default: {
                name: network.blockExplorer.name,
                url: network.blockExplorer.url,
              },
            }
          : undefined,
      }));

      const connectors = connectorsForWallets(
        [
          {
            groupName: "Recommended",
            wallets: [injectedWallet],
          },
        ],
        {
          appName: "Bando Widget App",
          projectId: "044601f65212332475a09bc14ceb3c34",
        }
      );

      const wagmiConfig = createConfig({
        connectors,
        chains: chainDefinitions,
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
