import { useRef, useState } from "react";
/*import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";*/
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ConnectButton } from "@components/ConnectButton/ConnectButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GlobalPreferences } from "@components/GlobalPreferences";
import CompanyMenu from "@components/CompanyMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [companyAnchorEl, setCompanyAnchorEl] = useState<null | HTMLElement>(null);
  const [companyOpen, setCompanyOpen] = useState(false);
  const ref = useRef(null);
  const [theme, setTheme] = useState('light');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSettingsOpen(!settingsOpen);
  };

  const handleLanguageClick = () => {
    console.log("Language clicked");
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // You can add additional logic here to apply the theme to your app
    console.log("Theme changed to", newTheme);
  };

  const handleCompanyClick = (event: React.MouseEvent<HTMLElement>) => {
    setCompanyAnchorEl(event.currentTarget);
    setCompanyOpen(!companyOpen);
  };

  const menuItems = [
    { text: "Home", href: "/" },
    { text: "About", href: "https://bando.cool/" },
    { text: "Explore our products", href: "/widget" },
    { text: "Contact", href: "mailto:soporte@bando.cool" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                borderLeft: "4px solid black",
                py: 2,
                pl: 3,
                pr: 4,
              }}
              href={item.href}
            >
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    color: "black",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            ref={ref}
            color="inherit"
            aria-label="settings"
            aria-controls={companyOpen ? 'company-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={companyOpen ? 'true' : undefined}
            onClick={handleCompanyClick}
          >
            <img
              src="/bando.svg"
              width={100}
              height={20}
              alt="Bando Logo"
              style={{ cursor: "pointer" }}
            />
            <ArrowDropDownIcon sx={{ maxWidth: '15px'}} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              ref={ref}
              color="inherit"
              aria-label="settings"
              aria-controls={settingsOpen ? 'settings-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={settingsOpen ? 'true' : undefined}
              sx={{ mr: 1 }}
              onClick={handleSettingsClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <ConnectButton />
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Popper
        id="settings-menu"
        anchorEl={anchorEl}
        open={settingsOpen}
      >
        <ClickAwayListener onClickAway={handleSettingsClose}>
          <Box>
            <GlobalPreferences
              selectedLanguage="en"
              selectedTheme={theme}
              onLanguageClick={() => handleLanguageClick()}
              onThemeChange={handleThemeChange}
            />
          </Box>
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
