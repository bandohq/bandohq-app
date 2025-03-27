import React from "react";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";

export const Widget = () => {
  const config = {
    buildUrl: true,
    locale: "es",
    theme: {
      container: {
        borderRadius: "24px",
        boxShadow: "0px 2px 24px -7px rgba(66,66,66,0.55)",
      },
    },
    hiddenUI: ["walletMenu"],
  } as Partial<WidgetConfig>;
  return <BandoWidget integrator="bando-app" config={config} />;
};
