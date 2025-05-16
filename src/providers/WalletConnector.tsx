import React, { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme,
  midnightTheme,
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
  rabbyWallet,
  binanceWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { BANDO_API_ROUTE } from "../utils/consts";
import nativeTokenCatalog from "../utils/nativeTokenCatalog";
import { transformToChainConfig } from "../utils/TransformToChainConfig";
import { useTheme } from "@mui/material/styles";
const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        walletConnectWallet,
        binanceWallet,
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
    projectId: "00fcded02606b78df1f2f732def1d79f",
  }
);

const farcasterFrameConnector = farcasterFrame();

export const WalletConnectorProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const theme = useTheme();
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
        connectors: [farcasterFrameConnector, ...connectors],
        // @ts-ignore format based on viem docs
        chains: [...chainDefinitions],
        transports: chainDefinitions.reduce((acc, chain) => {
          acc[chain.id] = http();
          return acc;
        }, {}),
        // initialChain:
        //   chainDefinitions.find((chain) => chain.key === "cel")?.chainId ??
        //   chainDefinitions[0]?.chainId,
        autoConnect: true,
      });

      setConfig(wagmiConfig);
    };

    setupChains();
  }, []);

  if (!config) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={theme.palette.mode === "dark" ? midnightTheme() : lightTheme()}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
