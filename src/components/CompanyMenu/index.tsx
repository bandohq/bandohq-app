import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Popper, 
  Paper, 
  Typography, 
  Divider, 
  IconButton,
  ClickAwayListener,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Switch
} from "@mui/material";
import {
  KeyboardArrowDown as ChevronDown,
  KeyboardArrowUp as ChevronUp,
  GitHub as Github,
  X,
  Telegram,
  Code,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
interface MenuSection {
  title: string;
  items: { label: string; href: string; active?: boolean }[];
}

interface CompanyMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export default function CompanyMenu({ open, setOpen, anchorEl, setAnchorEl }: CompanyMenuProps) {
  const [legalOpen, setLegalOpen] = useState(false);
  const theme = useTheme();
  const menuSections: MenuSection[] = [
    {
      title: "About",
      items: [
        { label: "Product", href: "https://bando.cool" },
        { label: "Blog", href: "https://bando.cool/blog" },
      ]
    },
    {
      title: "Protocol",
      items: [
        { label: "Docs", href: "https://docs.bando.cool" },
        { label: "API Reference", href: "https://docs.bando.cool/ap" },
        { label: "Become a Partner", href: "https://bando.cool/partners" },
      ]
    },
    {
      title: "Need help?",
      items: [
        { label: "Support", href: "https://bando.cool/support" },
        { label: "Contact us", href: "mailto:support@bando.cool" },
      ]
    }
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div>      
      <Popper
        id="company-menu"
        open={open} 
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{
          zIndex: 1300,
          width: "256px"
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper 
            elevation={3} 
            style={{
              borderRadius: "8px", 
              overflow: "hidden"
            }}
          >
            <Box style={{ padding: "8px" }}>
              {menuSections.map((section, i) => (
                <Box key={i} style={{ marginBottom: "16px" }}>
                  <Typography 
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      padding: "4px 12px"
                    }}
                  >
                    {section.title}
                  </Typography>
                  <List dense style={{ padding: 0 }}>
                    {section.items.map((item, j) => (
                      <ListItem 
                        key={j} 
                        style={{ padding: "6px 12px" }}
                        component="a"
                        href={item.href}
                        target="_blank"
                        sx={{ 
                          color: item.active ? theme.palette.text.primary : theme.palette.text.secondary,
                          fontWeight: item.active ? 500 : 400,
                          fontSize: "14px",
                          "&:hover": { backgroundColor: theme.palette.ink.i100 }
                        }}
                      >
                        <ListItemText 
                          primary={item.label}
                          style={{ margin: 0 }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
              
              <Divider style={{ margin: "8px 0", backgroundColor: theme.palette.ink.i400 }} />
              
              {/* Social icons */}
              <Box style={{ display: "flex", padding: "8px 12px", gap: "16px" }}>
                <IconButton size="small" style={{ padding: "6px" }} href="https://github.com/bandohq" target="_blank">
                  <Github style={{ width: "20px", height: "20px", color: theme.palette.text.primary }} />
                </IconButton>
                <IconButton size="small" style={{ padding: "6px" }} href="https://x.com/bandocool" target="_blank">
                  <X style={{ width: "20px", height: "20px", color: theme.palette.text.primary }} />
                </IconButton>
                <IconButton size="small" style={{ padding: "6px" }} href="https://t.me/bandocool" target="_blank">
                  <Telegram style={{ width: "20px", height: "20px", color: theme.palette.text.primary }} />
                </IconButton>
              </Box>
              
              <Divider style={{ margin: "8px 0", backgroundColor: theme.palette.ink.i400 }} />
              
              {/* Legal section */}
              <Box style={{ padding: "4px 12px" }}>
                <Button 
                  onClick={() => setLegalOpen(!legalOpen)}
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "4px 0",
                    textTransform: "none",
                    color: theme.palette.text.primary
                  }}
                  endIcon={legalOpen ? <ChevronUp /> : <ChevronDown />}
                >
                  <Typography style={{ fontSize: "14px", textAlign: "left" }}>
                    Legal & Privacy
                  </Typography>
                </Button>
                
                <Collapse in={legalOpen}>
                  <Box style={{ paddingTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>                    
                    <Typography 
                      component="a" 
                      href="https://app.bando.cool/privacy-notice"
                      target="_blank"
                      style={{ 
                        fontSize: "14px", 
                        color: theme.palette.text.secondary, 
                        textDecoration: "none", 
                        padding: "4px 0", 
                        display: "block" 
                      }}
                    >
                      Privacy Policy
                    </Typography>
                    
                    <Typography 
                      component="a" 
                      href="https://app.bando.cool/terms"
                      target="_blank"
                      style={{ 
                        fontSize: "14px", 
                        color: theme.palette.text.secondary, 
                        textDecoration: "none", 
                        padding: "4px 0", 
                        display: "block" 
                      }}
                    >
                      Terms of Service
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}
