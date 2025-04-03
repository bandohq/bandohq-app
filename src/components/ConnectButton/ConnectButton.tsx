import React from "react";
import { ConnectButton as ConnectButtonRainbow } from "@rainbow-me/rainbowkit";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

export const ConnectButton = () => {
  const theme = useTheme();
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
        const connected = ready && account && chain;
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
                    sx={{ borderRadius: "16px", bgcolor: theme.palette.ink.i900, textTransform: "none", color: theme.palette.ink.i100 }}
                    size="small"
                  >
                    {t("connectWallet")}
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
                    {t("wrongNetwork")}
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    onClick={openChainModal}
                    sx={{
                      display: { xs: "none", md: "flex", alignItems: "center" },
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      color: theme.palette.ink.i900,
                      "&:hover": {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                      },
                    }}
                    variant="contained"
                    size="small"
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        style={{ width: 12, height: 12, marginRight: 4 }}
                      />
                    )}
                    {chain.name}
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    variant="contained"
                    size="small"
                    sx={{ 
                      backgroundColor: 'transparent',
                      color: theme.palette.ink.i900,
                      boxShadow: 'none',
                      "&:hover": { backgroundColor: 'transparent', boxShadow: 'none' },
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
