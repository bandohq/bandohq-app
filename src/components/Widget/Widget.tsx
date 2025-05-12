import React from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { useTheme, useMediaQuery } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";

export const Widget = () => {
  const { i18n } = useTranslation();
  const { connected, safe } = useSafeAppsSDK();
  const { openConnectModal } = useConnectModal();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const baseConfig: Partial<WidgetConfig> = {
    buildUrl: true,
    appearance: theme.palette.mode,
    walletConfig: {
      onConnect: () => {
        if (safe) {
          return;
        }
        openConnectModal?.();
      },
    },
    languages: {
      default: i18n.language as "en" | "es",
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

  const config = safe
    ? {
        ...baseConfig,
        walletConfig: {
          ...baseConfig.walletConfig,
          address: safe.safeAddress,
          chainId: safe.chainId,
        },
      }
    : baseConfig;

  return (
    <>
      {connected && safe && (
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <p>Conectado a Safe: {safe.safeAddress}</p>
          <p>Chain ID: {safe.chainId}</p>
        </div>
      )}
      <BandoWidget integrator="bando-app" config={config} />
    </>
  );
};
