import React from "react";
import { ConnectButton as ConnectButtonRainbow } from "@rainbow-me/rainbowkit";
import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useMiniPayDetection } from "../../hooks/walletDetect";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";

export const ConnectButton = () => {
  const theme = useTheme();
  const { isMiniPay } = useMiniPayDetection();
  const { connected: isSafeConnected, safe } = useSafeAppsSDK();

  console.log("isSafeConnected", isSafeConnected);
  console.log("safe", safe);

  return (
    <ConnectButtonRainbow.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const { t } = useTranslation("wallet");
        const ready = mounted;
        const connected = ready && account;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    variant="contained"
                    sx={{
                      borderRadius: "16px",
                      bgcolor: theme.palette.ink.i900,
                      textTransform: "none",
                      color: theme.palette.ink.i100,
                    }}
                    size="small"
                  >
                    {t("wallet:connectWallet")}
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: "16px" }}
                    size="small"
                  >
                    {t("wallet:wrongNetwork")}
                  </Button>
                );
              }
              if (isSafeConnected && safe) {
                return (
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        fontSize: { xs: 12, sm: "1rem" },
                        backgroundColor: "transparent",
                        color: theme.palette.ink.i900,
                        boxShadow: "none",
                        px: { xs: 0.5, sm: 1, md: 2 },
                        py: { xs: 0.2, sm: 0.5, md: 1 },
                        minWidth: { xs: 0, sm: 0, md: 36 },
                        "&:hover": {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          cursor: "default",
                        },
                      }}
                    >
                      {account.displayName}
                    </Button>
                  </div>
                );
              }

              return (
                <div style={{ display: "flex" }}>
                  {!isMiniPay && (
                    <Button
                      onClick={openChainModal}
                      sx={{
                        display: {
                          md: "flex",
                          alignItems: "center",
                        },
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        color: theme.palette.ink.i900,
                        px: { xs: 0.5, sm: 1, md: 2 },
                        py: { xs: 0.2, sm: 0.5, md: 1 },
                        minWidth: { xs: 0, sm: 0, md: 36 },
                        "&:hover": {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        },
                      }}
                      variant="contained"
                      size="small"
                    >
                      <Box
                        component="img"
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        sx={{
                          width: { xs: 18, md: 15 },
                          height: { xs: 18, md: 15 },
                          mr: 1,
                          borderRadius: "50px",
                        }}
                      />
                      <Box sx={{ display: { xs: "none", md: "block" } }}>
                        {chain.name}
                      </Box>
                    </Button>
                  )}
                  <Button
                    onClick={openAccountModal}
                    variant="contained"
                    size="small"
                    sx={{
                      fontSize: { xs: 12, sm: "1rem" },
                      backgroundColor: "transparent",
                      color: theme.palette.ink.i900,
                      boxShadow: "none",
                      px: { xs: 0.5, sm: 1, md: 2 },
                      py: { xs: 0.2, sm: 0.5, md: 1 },
                      minWidth: { xs: 0, sm: 0, md: 36 },
                      "&:hover": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButtonRainbow.Custom>
  );
};
