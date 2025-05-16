import React from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { useTheme, useMediaQuery } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const Widget = () => {
  const { i18n } = useTranslation();
  const { openConnectModal } = useConnectModal();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  
  const config = {
    buildUrl: true,
    appearance: theme.palette.mode,
    walletConfig: {
      onConnect: () => {
        openConnectModal?.();
      },
      chainId: 42220,
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
