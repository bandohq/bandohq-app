import React from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useSwitchChain, useChainId, useAccount } from "wagmi";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useIsFarcaster, useMiniPayDetection } from "@hooks/walletDetect";

export const Widget = () => {
  const { i18n } = useTranslation();
  const { openConnectModal } = useConnectModal();
  const isMiniApp = useIsFarcaster();
  const theme = useTheme();
  const { isMiniPay } = useMiniPayDetection();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  const integrator = isMiniPay
    ? "opera-minipay-app"
    : isMiniApp
    ? "farcaster-app"
    : "bando-app";

  const handleSwitchChain = async () => {
    if (chainId === 42220) {
      await switchChain({ chainId: 8453 });
    } else {
      await switchChain({ chainId: 42220 });
    }
  };
  
  // we are carefully opening countries on the minipay opera wallet.
  const miniPayCountries = ["US", "MX", "NG", "GH", "KE", "ZA"];

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
      {isMiniApp && (
        <Button
          onClick={() => handleSwitchChain()}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: chainId !== 42220 ? "#FCFF51" : "#0052FE",
            boxShadow: "none",
            color: chainId !== 42220 ? "#000" : "#fff",
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
          {chainId === 42220 ? "Switch to Base" : "Switch to Celo"}
          <SyncAltIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
        </Button>
      )}
      <BandoWidget integrator={integrator} config={config} />
    </>
  );
};
