import React from "react";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const Widget = () => {
  const { openConnectModal } = useConnectModal();
  const config = {
    buildUrl: true,
    locale: "es",
    walletConfig: {
      onConnect: () => {
        openConnectModal?.();
      },
    },
    theme: {
      container: {
        borderRadius: "24px",
        boxShadow: "0px 2px 24px -7px rgba(66,66,66,0.55)",
      },
    },
  } as Partial<WidgetConfig>;
  return <BandoWidget integrator="bando-app" config={config} />;
};
