import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Collapse } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface DrawerProps {
  handleDrawerToggle: () => void;
}

export const CompanyDrawer = ({ handleDrawerToggle }: DrawerProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <Box onClick={(e) => e.stopPropagation()} sx={{ textAlign: "center" }}>
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
          
          <Divider sx={{ my: 1 }} />
          
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
          
          <Divider sx={{ my: 1 }} />
          
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
        </List>
      </Box>
    </Box>
  );
};

export default CompanyDrawer;
