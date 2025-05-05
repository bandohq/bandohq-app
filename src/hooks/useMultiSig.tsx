// hooks/useMultisig.ts
import { useEffect, useState } from "react";
import SafeAppsSDK from "@safe-global/safe-apps-sdk";
import { Connector } from "wagmi";

const sdk = new SafeAppsSDK();

export const useMultisig = (connector?: Connector) => {
  const [isMultisig, setIsMultisig] = useState(false);

  const isIframe = () => window?.parent !== window;

  const getIsSafeConnector = async () => {
    if (connector?.id === "safe") return true;
    if (connector?.id !== "walletConnect") return false;
    const provider = await connector.getProvider();
    return (provider as any)?.session?.peer?.metadata?.name
      ?.toLowerCase?.()
      ?.includes?.("safe");
  };

  const detectSafe = async () => {
    if (!isIframe()) return false;

    try {
      const info = await Promise.race([
        sdk.safe.getInfo(),
        new Promise<undefined>((res) => setTimeout(res, 300)),
      ]);
      return !!info?.safeAddress;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const result = await getIsSafeConnector();
      const isInSafeApp = await detectSafe();
      if (result || isInSafeApp) {
        setIsMultisig(true);
      }
    })();
  }, [connector]);

  return { isMultisig };
};
