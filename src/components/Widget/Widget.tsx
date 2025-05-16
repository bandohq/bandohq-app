import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { useTheme, useMediaQuery } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useIsFarcaster } from "@hooks/walletDetect";
import { useSwitchChain } from "wagmi";

export const Widget = () => {
  const { i18n } = useTranslation();
  const { openConnectModal } = useConnectModal();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    window.parent.postMessage({ type: "log", args: "chainID: 42220" }, "*");
    switchChain({ chainId: 42220 });
  }, []);

  const config = {
    buildUrl: true,
    appearance: theme.palette.mode,
    walletConfig: {
      onConnect: () => {
        openConnectModal?.();
      },
    },
    languages: {
      default: i18n.language,
      supported: ["en", "es"],
    },
    theme: {
      container: {
        borderRadius: "10px",
        boxShadow: "0px 2px 24px -7px rgba(66,66,66,0.55)",
        maxHeight: isXs ? "550px" : "600px",
      },
    },
  } as Partial<WidgetConfig>;
  return <BandoWidget integrator="bando-app" config={config} />;
};
