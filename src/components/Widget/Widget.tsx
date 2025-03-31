import React from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";

export const Widget = () => {
  const { i18n } = useTranslation();
  const config = {
    buildUrl: true,
    languages: {
      default: i18n.language,
      supported: ["en", "es"],
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
