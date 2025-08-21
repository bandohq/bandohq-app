import React from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { useTheme } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useIsBinance,
  useIsCoinbase,
  useIsFarcaster,
  useMiniPayDetection,
  useIsWorldApp,
} from "@hooks/walletDetect";
import { useWorldWallet } from "@hooks/useWorldWallet";

export const Widget = () => {
  const { i18n } = useTranslation();
  const { openConnectModal } = useConnectModal();
  const isMiniApp = useIsFarcaster();
  const theme = useTheme();
  const { isMiniPay } = useMiniPayDetection();
  const isBinance = useIsBinance();
  const isCoinbase = useIsCoinbase();
  const isWorldApp = useIsWorldApp();
  const { isMounted } = useWorldWallet();

  // if world app is mounted, show the widget
  const shouldShowWidget = isWorldApp ? isMounted : true;

  const integrator = isWorldApp
    ? "world-app"
    : isMiniPay
    ? "opera-minipay-app"
    : isCoinbase // must always be before isMiniApp
    ? "coinbase-app"
    : isMiniApp
    ? "farcaster-app"
    : isBinance
    ? "binance-app"
    : "bando-app";

  // we are carefully opening countries on the minipay opera wallet.
  const miniPayCountries = ["US", "MX", "NG", "GH", "KE", "ZA", "PH", "IN"];

  const config = {
    buildUrl: true,
    appearance: theme.palette.mode,
    transactionProvider: isWorldApp
      ? (() => {
          // Only import MiniKit when we're actually in World App
          const { MiniKit } = require("@worldcoin/minikit-js");
          return MiniKit;
        })()
      : undefined,
    walletConfig: {
      onConnect: () => {
        openConnectModal?.();
      },
    },
    languages: {
      default: i18n.language,
      supported: ["en", "es"],
    },
    // If `isMiniPay` is true, restrict access to specific countries listed in `miniPayCountries`.
    // If `isMiniPay` is false, setting `allowedCountries` to `undefined` allows access from all countries.
    allowedCountries: isMiniPay ? miniPayCountries : undefined,
    theme: {
      container: {
        borderRadius: "10px",
        boxShadow: "0px 2px 24px -7px rgba(66,66,66,0.55)",
        maxHeight: "600px",
      },
    },
  } as Partial<WidgetConfig>;

  return (
    <>
      {shouldShowWidget && (
        <BandoWidget integrator={integrator} config={config} />
      )}
    </>
  );
};
