import { useRef, useState } from "react";
/*import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";*/
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Popper,
  ClickAwayListener,
  Paper,
  Button,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ConnectButton } from "@components/ConnectButton/ConnectButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { GlobalPreferences } from "@components/GlobalPreferences";
import CompanyMenu from "@components/CompanyMenu";
import CompanyDrawer from "@components/CompanyMenu/drawer";
import { useThemeContext } from "../../context/ThemeContext";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { MenuItem } from "@components/CompanyMenu/drawer";
import { useMiniPayDetection } from '@hooks/walletDetect';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [companyAnchorEl, setCompanyAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [companyOpen, setCompanyOpen] = useState(false);
  const ref = useRef(null);
  const { mode } = useThemeContext();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { isMiniPay } = useMiniPayDetection();
  const [hoverItem, setHoverItem] = useState<{
    element: HTMLElement | null;
    item: MenuItem | null;
  }>({ element: null, item: null });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSettingsOpen(!settingsOpen);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme: string) => {
    // set the actual theme from the theme
    // This function is now empty as the theme is managed by the ThemeContext
  };

  const handleCompanyClick = (event: React.MouseEvent<HTMLElement>) => {
    setCompanyAnchorEl(event.currentTarget);
    setCompanyOpen(!companyOpen);
  };

  const handleHoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    item: MenuItem
  ) => {
    if (item.subItems && item.subItems.length > 0) {
      setHoverItem({ element: event.currentTarget, item });
    } else {
      setHoverItem({ element: null, item: null });
    }
  };

  const handleHoverClose = () => {
    setHoverItem({ element: null, item: null });
  };

  const menuItems: MenuItem[] = [
    { text: t("main:main.spend", "Spend"), href: "/" },
    !isMiniPay && {
      text: t("main:main.buySell", "Buy/Sell"),
      href: "https://ramp.bando.cool/",
      badge: "Only for 🇲🇽",
    },
    {
      text: t("main:main.docs", "Docs"),
      subItems: [
        {
          text: t("main:main.documentation", "Documentation"),
          href: "https://docs.bando.cool",
        },
        {
          text: t("main:main.apiReference", "API Reference"),
          href: "https://docs.bando.cool/fulfiller-api/api-reference",
        },
        {
          text: t("main:main.becomePartner", "Become a Partner"),
          href: "https://tally.so/r/mexLqk",
        },
      ],
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            ref={ref}
            color="inherit"
            aria-label={t("main:settings", "settings")}
            aria-controls={companyOpen ? "company-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={companyOpen ? "true" : undefined}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleCompanyClick}
            >
              <img
                src={
                  theme.palette.mode === "dark"
                    ? "/bando_white.svg"
                    : "/bando.svg"
                }
                width={100}
                height={20}
                alt={t("main:title", "Bando Logo")}
                style={{ cursor: "pointer" }}
              />
              <KeyboardArrowDownIcon
                sx={{ maxWidth: "15px", cursor: "pointer" }}
              />
            </Box>
            <IconButton
              color="inherit"
              aria-label={t("main:main.openDrawer", "open drawer")}
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <img
                src={
                  theme.palette.mode === "dark"
                    ? "/bando_white.svg"
                    : "/bando.svg"
                }
                width={100}
                height={20}
                alt={t("main:title", "Bando Logo")}
                style={{ cursor: "pointer" }}
              />
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "flex" }, ml: 2 }}>
              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  onMouseEnter={(e) => handleHoverOpen(e, item)}
                  onMouseLeave={handleHoverClose}
                >
                  {item.badge && (
                    <Tooltip
                      title={item.badge}
                      arrow
                      sx={{ bgcolor: "primary.main" }}
                    >
                      <Box
                        sx={{ position: "relative", display: "inline-flex" }}
                      >
                        <Button
                          color="inherit"
                          href={item.href}
                          sx={{
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "transparent",
                              textDecoration: "underline",
                            },
                            fontWeight: "400",
                          }}
                          disableRipple
                          disableElevation
                          disableFocusRipple
                          disableTouchRipple
                        >
                          {item.text}
                        </Button>
                      </Box>
                    </Tooltip>
                  )}
                  {!item.badge && (
                    <Button
                      color="inherit"
                      href={item.href}
                      sx={{
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  )}
                  {item.subItems && hoverItem.item?.text === item.text && (
                    <Popper
                      open={Boolean(hoverItem.element)}
                      anchorEl={hoverItem.element}
                      placement="bottom-start"
                      sx={{
                        zIndex: 1300,
                        mt: 1,
                        "& .MuiPaper-root": {
                          borderRadius: "8px",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <Paper elevation={3}>
                        <List sx={{ py: 1, minWidth: 200 }}>
                          {item.subItems.map((subItem, subIndex) => (
                            <ListItem key={subIndex} disablePadding>
                              <ListItemButton
                                component="a"
                                href={subItem.href}
                                target="_blank"
                                sx={{
                                  py: 1,
                                  px: 2,
                                  "&:hover": {
                                    backgroundColor: (theme) =>
                                      theme.palette.mode === "dark"
                                        ? "rgba(255, 255, 255, 0.08)"
                                        : "rgba(0, 0, 0, 0.04)",
                                  },
                                }}
                              >
                                <ListItemText
                                  primary={subItem.text}
                                  primaryTypographyProps={{
                                    variant: "subtitle2",
                                    sx: { fontWeight: 400 },
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Popper>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              ref={ref}
              color="inherit"
              aria-label={t("main:main.settings", "settings")}
              aria-controls={settingsOpen ? "settings-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={settingsOpen ? "true" : undefined}
              sx={{ mr: 1 }}
              onClick={handleSettingsClick}
              disableRipple
            >
              <MoreHorizIcon />
            </IconButton>
            <ConnectButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <SwipeableDrawer
          anchor="bottom"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
            },
          }}
        >
          <CompanyDrawer
            handleDrawerToggle={handleDrawerToggle}
            menuItems={menuItems}
          />
        </SwipeableDrawer>
      </Box>
      <Popper id="settings-menu" anchorEl={anchorEl} open={settingsOpen}>
        <ClickAwayListener onClickAway={handleSettingsClose}>
          <Paper
            elevation={3}
            style={{ borderRadius: "8px", overflow: "hidden" }}
          >
            <GlobalPreferences
              selectedLanguage={i18n.language}
              selectedTheme={mode}
              onThemeChange={handleThemeChange}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
      <CompanyMenu
        open={companyOpen}
        anchorEl={companyAnchorEl}
        setOpen={setCompanyOpen}
        setAnchorEl={setCompanyAnchorEl}
      />
    </Box>
  );
}
