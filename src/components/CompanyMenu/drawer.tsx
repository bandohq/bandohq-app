import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Collapse, IconButton, Button } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import { menuSections } from "./menuSections";

export interface MenuItem {
  text: string;
  href?: string;
  badge?: string;
  subItems?: { text: string; href: string }[];
}

interface DrawerProps {
  handleDrawerToggle: () => void;
  menuItems: MenuItem[];
}

export const CompanyDrawer = ({
  handleDrawerToggle,
  menuItems,
}: DrawerProps) => {
  const { t } = useTranslation("main");
  const theme = useTheme();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const ms = menuSections(t);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <Box onClick={(e) => e.stopPropagation()} sx={{ textAlign: "center" }}>
      {/* App section */}
      <ListItem>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ fontWeight: "bold", fontSize: "14px", flexGrow: 1 }}
        >
          {t("main.app", "App")}
        </Typography>
      </ListItem>
      <List component="div" disablePadding>
        {menuItems.map((item, index) => (
          <div key={index}>
            <ListItem disablePadding>
              {item.subItems ? (
                <ListItemButton onClick={() => toggleSection(`menu-${index}`)}>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ fontWeight: "400" }}>
                          {item.text}
                        </Typography>
                        {openSections[`menu-${index}`] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              ) : (
                <ListItemButton
                  component="a"
                  href={item.href}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textDecoration: "none",
                          color: "inherit",
                          fontWeight: "400",
                        }}
                      >
                        {item.text}
                        {item.badge && (
                          <Box
                            component="span"
                            sx={{
                              ml: 1,
                              px: 1,
                              py: 0.5,
                              borderRadius: "12px",
                              fontSize: "10px",
                              fontWeight: "bold",
                              backgroundColor: "primary.main",
                              color: "white",
                            }}
                          >
                            {item.badge}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              )}
            </ListItem>
            {item.subItems && (
              <Collapse
                in={!!openSections[`menu-${index}`]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding>
                      <ListItemButton
                        component="a"
                        href={subItem.href}
                        target="_blank"
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
      <Divider />
      <Box sx={{ width: "100%", py: 2 }}>
        <List>
          {/* Render sections from menuSections */}
          {ms.map((section) => (
            <div key={section.id}>
              <ListItem
                onClick={() => toggleSection(section.id)}
                sx={{ cursor: "pointer" }}
              >
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontWeight: "bold", fontSize: "14px", flexGrow: 1 }}
                >
                  {section.title}
                </Typography>
                {openSections[section.id] ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </ListItem>
              <Collapse
                in={!!openSections[section.id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {section.items.map((item, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton
                        component="a"
                        className={item.className || ""}
                        href={item.href}
                        target="_blank"
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}

          {/* Social icons */}
          <Box style={{ display: "flex", padding: "8px 12px", gap: "16px" }}>
            <IconButton
              size="small"
              style={{ padding: "6px" }}
              href="https://github.com/bandohq"
              target="_blank"
            >
              <GitHubIcon
                style={{
                  width: "20px",
                  height: "20px",
                  color: theme.palette.text.primary,
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              style={{ padding: "6px" }}
              href="https://x.com/bandocool"
              target="_blank"
            >
              <XIcon
                style={{
                  width: "20px",
                  height: "20px",
                  color: theme.palette.text.primary,
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              style={{ padding: "6px" }}
              href="https://t.me/bandocomunidad"
              target="_blank"
            >
              <TelegramIcon
                style={{
                  width: "20px",
                  height: "20px",
                  color: theme.palette.text.primary,
                }}
              />
            </IconButton>
          </Box>

          {/* Legal section - keeping this separate as it has a different styling */}
          <Box style={{ padding: "4px 12px" }}>
            <Button
              onClick={() => toggleSection("legal")}
              style={{
                justifyContent: "space-between",
                width: "100%",
                padding: "4px 0",
                textTransform: "none",
                color: theme.palette.text.primary,
              }}
              endIcon={
                openSections["legal"] ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )
              }
            >
              <Typography style={{ fontSize: "14px", textAlign: "left" }}>
                {t("main.legalPrivacy", "Legal & Privacy")}
              </Typography>
            </Button>

            <Collapse in={!!openSections["legal"]}>
              <Box
                style={{
                  paddingTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Typography
                  component="a"
                  href="https://bando.cool/privacy-notice"
                  target="_blank"
                  style={{
                    fontSize: "14px",
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    padding: "4px 0",
                    display: "block",
                  }}
                >
                  {t("main.privacyPolicy", "Privacy Policy")}
                </Typography>

                <Typography
                  component="a"
                  href="https://bando.cool/terms"
                  target="_blank"
                  style={{
                    fontSize: "14px",
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    padding: "4px 0",
                    display: "block",
                  }}
                >
                  {t("main.termsOfService", "Terms of Service")}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </List>
      </Box>
    </Box>
  );
};

export default CompanyDrawer;
