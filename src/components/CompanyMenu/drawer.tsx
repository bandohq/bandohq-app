import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Collapse, IconButton, Button } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
interface DrawerProps {
  handleDrawerToggle: () => void;
  menuItems: { text: string; href: string; badge?: string }[];
}

export const CompanyDrawer = ({ handleDrawerToggle, menuItems }: DrawerProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <Box onClick={(e) => e.stopPropagation()} sx={{ textAlign: "center" }}>
      {/* App section */}
      <ListItem>
        <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold', fontSize: '14px', flexGrow: 1 }}>
          {t('main.app', 'App')}
        </Typography>
      </ListItem>
      <List component="div" disablePadding>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton 
              component="a" 
              href={item.href}
              onClick={handleDrawerToggle}
            >
              <ListItemText 
                primary={
                  <Box
                    component="a" 
                    href={item.href} 
                    sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', fontWeight: '400' }}
                    onClick={handleDrawerToggle}
                  >
                    {item.text}
                    {item.badge && (
                      <Box 
                        component="span" 
                        sx={{ 
                          ml: 1, 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: '12px', 
                          fontSize: '10px',
                          fontWeight: 'bold',
                          backgroundColor: 'primary.main', 
                          color: 'white' 
                        }}
                      >
                        {item.badge}
                      </Box>
                    )}
                  </Box>
                } 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ width: '100%', py: 2 }}>
        <List>
          {/* About section */}
          <ListItem 
            onClick={() => setAboutOpen(!aboutOpen)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold', fontSize: '14px', flexGrow: 1 }}>
              {t('main.about', 'About')}
            </Typography>
            {aboutOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ListItem>
          <Collapse in={aboutOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton component="a" href="https://bando.cool">
                  <ListItemText primary={t('main.product', 'Product')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="https://bando.cool/blog">
                  <ListItemText primary={t('main.blog', 'Blog')} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
                    
          {/* Protocol section */}
          <ListItem 
            onClick={() => setProtocolOpen(!protocolOpen)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold', fontSize: '14px', flexGrow: 1 }}>
              {t('protocol', 'Protocol')}
            </Typography>
            {protocolOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ListItem>
          <Collapse in={protocolOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton component="a" href="https://docs.bando.cool">
                  <ListItemText primary={t('main.docs', 'Docs')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="https://docs.bando.cool/ap">
                  <ListItemText primary={t('main.apiReference', 'API Reference')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="https://bando.cool/partners">
                  <ListItemText primary={t('main.becomePartner', 'Become a Partner')} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
                    
          {/* Need help section */}
          <ListItem 
            onClick={() => setHelpOpen(!helpOpen)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold', fontSize: '14px', flexGrow: 1 }}>
              {t('needHelp', 'Need help?')}
            </Typography>
            {helpOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ListItem>
          <Collapse in={helpOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton component="a" href="https://bando.cool/support">
                  <ListItemText primary={t('main.support', 'Support')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="mailto:support@bando.cool">
                  <ListItemText primary={t('main.contactUs', 'Contact us')} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
                    
          {/* Social icons */}
          <Box style={{ display: "flex", padding: "8px 12px", gap: "16px"}}>
            <IconButton size="small" style={{ padding: "6px" }} href="https://github.com/bandohq" target="_blank">
              <GitHubIcon style={{ width: "20px", height: "20px", color: theme.palette.text.primary }} />
            </IconButton>
            <IconButton size="small" style={{ padding: "6px" }} href="https://x.com/bandocool" target="_blank">
              <XIcon style={{ width: "20px", height: "20px", color: theme.palette.text.primary }} />
            </IconButton>
            <IconButton size="small" style={{ padding: "6px" }} href="https://t.me/bandocool" target="_blank">
              <TelegramIcon style={{ width: "20px", height: "20px", color: theme.palette.text.primary }} />
            </IconButton>
          </Box>
                    
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
              endIcon={legalOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            >
              <Typography style={{ fontSize: "14px", textAlign: "left" }}>
                {t('main.legalPrivacy', 'Legal & Privacy')}
              </Typography>
            </Button>
            
            <Collapse in={legalOpen}>
              <Box style={{ paddingTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>                    
                <Typography 
                  component="a" 
                  href="https://ramp.bando.cool/privacy-notice"
                  target="_blank"
                  style={{ 
                    fontSize: "14px", 
                    color: theme.palette.text.secondary, 
                    textDecoration: "none", 
                    padding: "4px 0", 
                    display: "block" 
                  }}
                >
                  {t('main.privacyPolicy', 'Privacy Policy')}
                </Typography>
                
                <Typography 
                  component="a" 
                  href="https://ramp.bando.cool/terms"
                  target="_blank"
                  style={{ 
                    fontSize: "14px", 
                    color: theme.palette.text.secondary, 
                    textDecoration: "none", 
                    padding: "4px 0", 
                    display: "block" 
                  }}
                >
                  {t('main.termsOfService', 'Terms of Service')}
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
