import { useState, useEffect } from 'react';
import { sdk } from "@farcaster/frame-sdk";

/**
 * A hook that detects if the current Ethereum provider is MiniPay.
 * MiniPay is a mobile wallet with a web3 enabled browser built on Celo.
 *
 * @returns An object containing:
 * - isMiniPay: boolean indicating if the provider is MiniPay
 * - isProviderAvailable: boolean indicating if any provider is available
 */
export const useMiniPayDetection = () => {
  const [isMiniPay, setIsMiniPay] = useState<boolean>(false);
  const [isProviderAvailable, setIsProviderAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    const detectMiniPay = () => {
      // Check if window.ethereum exists
      if (typeof window !== "undefined" && window.ethereum) {
        setIsProviderAvailable(true);
        // Check if the provider is MiniPay by looking for the isMiniPay property
        if (window.ethereum.isMiniPay) {
          setIsMiniPay(true);
        }
      }
    };

    detectMiniPay();

    // Listen for provider changes (e.g., if a user switches wallets)
    const handleProviderChange = () => {
      detectMiniPay();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("ethereum#initialized", handleProviderChange);
      // Also listen for chainChanged as a proxy for provider changes
      if (window.ethereum) {
        window.ethereum.on("chainChanged", handleProviderChange);
      }
    }

    return () => {
      // Clean up event listeners
      if (typeof window !== "undefined") {
        window.removeEventListener(
          "ethereum#initialized",
          handleProviderChange
        );
        if (window.ethereum) {
          window.ethereum.removeListener("chainChanged", handleProviderChange);
        }
      }
    };
  }, []);

  return { isMiniPay, isProviderAvailable };
};

/**
 * A hook that detects if the application is running inside a Warpcast mini app.
 *
 * @returns A boolean indicating if the app is running inside a Warpcast mini app
 */
export const useIsWarpcast = () => {
  const [isWarpcast, setIsWarpcast] = useState(false);

  useEffect(() => {
    const checkWarpcast = async () => {
      try {
        const isInMiniAppResult = await sdk.isInMiniApp();
        setIsWarpcast(isInMiniAppResult);
      } catch (error) {
        setIsWarpcast(false);
      }
    };
    checkWarpcast();
  }, []);

  return isWarpcast;
};

/**
 * Type declaration for the global window object with Ethereum provider
 */
declare global {
  interface Window {
    ethereum?: {
      isMiniPay?: boolean;
      isMetaMask?: boolean;
      isRainbow?: boolean;
      isPhantom?: boolean;
      isWalletConnect?: boolean;
      isBinance?: boolean;
      isZerion?: boolean;
      isSafe?: boolean;
      isRabby?: boolean;
      isCoinbase?: boolean;
      isBraveWallet?: boolean;
      on: (event: string, callback: () => void) => void;
      removeListener: (event: string, callback: () => void) => void;
      [key: string]: any;
    } | any;
  }
}
