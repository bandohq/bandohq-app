import React from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useSwitchChain } from "wagmi";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useIsFarcaster } from "@hooks/walletDetect";

export const Widget = () => {
  const { i18n } = useTranslation();
  const { openConnectModal } = useConnectModal();
  const isMiniApp = useIsFarcaster();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const { switchChain } = useSwitchChain();

  const switchToCelo = async () => {
    await switchChain({ chainId: 42220 });
  };

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
  return (
    <>
      {isMiniApp && (
        <Button
          onClick={() => switchToCelo()}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#FCFF51",
            boxShadow: "none",
            color: "#000",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            width: "180px",
            mx: "auto",
            marginBottom: "10px",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Switch to Celo{" "}
          <SyncAltIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
        </Button>
      )}
      <BandoWidget integrator="bando-app" config={config} />
    </>
  );
};
