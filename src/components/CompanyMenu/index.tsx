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
  Twitter,
  Download
} from "@mui/icons-material";

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

  const menuSections: MenuSection[] = [
    {
      title: "Company",
      items: [
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ]
    },
    {
      title: "Protocol",
      items: [
        { label: "Vote", href: "#" },
        { label: "Governance", href: "#" },
        { label: "Developers", href: "#" },
      ]
    },
    {
      title: "Need help?",
      items: [
        { label: "Help center", href: "#" },
        { label: "Contact us", href: "#" },
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
                        sx={{ 
                          color: item.active ? "#000000" : "#757575",
                          fontWeight: item.active ? 500 : 400,
                          fontSize: "14px",
                          "&:hover": { backgroundColor: "#F5F5F5" }
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

              <Divider style={{ margin: "8px 0" }} />
              
              {/* Download section */}
              <Box style={{ padding: "8px 12px", display: "flex", alignItems: "center" }}>
                <Box 
                  style={{ 
                    backgroundColor: "#F3E8FF", 
                    borderRadius: "50%", 
                    padding: "6px",
                    marginRight: "12px"
                  }}
                >
                  <Download style={{ width: "16px", height: "16px", color: "#9333EA" }} />
                </Box>
                <Box>
                  <Typography style={{ fontWeight: 500, fontSize: "14px" }}>
                    Download Uniswap
                  </Typography>
                  <Typography style={{ fontSize: "12px", color: "#757575" }}>
                    Available on iOS and Android
                  </Typography>
                </Box>
              </Box>
              
              <Divider style={{ margin: "8px 0" }} />
              
              {/* Social icons */}
              <Box style={{ display: "flex", padding: "8px 12px", gap: "16px" }}>
                <IconButton size="small" style={{ padding: "6px" }}>
                  <Github style={{ width: "20px", height: "20px", color: "#333333" }} />
                </IconButton>
                <IconButton size="small" style={{ padding: "6px" }}>
                  <Twitter style={{ width: "20px", height: "20px", color: "#333333" }} />
                </IconButton>
                <IconButton size="small" style={{ padding: "6px" }}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#333333" }}
                  >
                    <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" fill="currentColor" />
                  </svg>
                </IconButton>
              </Box>
              
              <Divider style={{ margin: "8px 0" }} />
              
              {/* Legal section */}
              <Box style={{ padding: "4px 12px" }}>
                <Button 
                  onClick={() => setLegalOpen(!legalOpen)}
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "4px 0",
                    textTransform: "none",
                    color: "#000000"
                  }}
                  endIcon={legalOpen ? <ChevronUp /> : <ChevronDown />}
                >
                  <Typography style={{ fontSize: "14px", textAlign: "left" }}>
                    Legal & Privacy
                  </Typography>
                </Button>
                
                <Collapse in={legalOpen}>
                  <Box style={{ paddingTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Box 
                        style={{ 
                          width: "40px", 
                          height: "20px", 
                          backgroundColor: "#E0E0E0", 
                          borderRadius: "20px", 
                          padding: "4px", 
                          display: "flex", 
                          alignItems: "center" 
                        }}
                      >
                        <Box 
                          style={{ 
                            width: "12px", 
                            height: "12px", 
                            backgroundColor: "#FFFFFF", 
                            borderRadius: "50%" 
                          }} 
                        />
                      </Box>
                      <Typography style={{ fontSize: "12px", color: "#757575" }}>
                        Your Privacy Choices
                      </Typography>
                    </Box>
                    
                    <Typography 
                      component="a" 
                      href="#" 
                      style={{ 
                        fontSize: "14px", 
                        color: "#757575", 
                        textDecoration: "none", 
                        padding: "4px 0", 
                        display: "block" 
                      }}
                    >
                      Privacy Policy
                    </Typography>
                    
                    <Typography 
                      component="a" 
                      href="#" 
                      style={{ 
                        fontSize: "14px", 
                        color: "#757575", 
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

