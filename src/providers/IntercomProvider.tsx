import { Intercom } from "@intercom/messenger-js-sdk";
import { PropsWithChildren, useEffect } from "react";

type IntercomProviderProps = PropsWithChildren;
export const IntercomProvider = ({ children }: IntercomProviderProps) => {
  const app_id = "gtz8x9mh";

  // NOTE: Boot Intercom on app start
  useEffect(() => {
    Intercom({
      app_id: app_id,
      hide_default_launcher: true,
      custom_launcher_selector: ".intercom-launcher",
    });
  }, []);

  return <>{children}</>;
};
