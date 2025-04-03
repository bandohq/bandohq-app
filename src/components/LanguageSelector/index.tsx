import React from "react";
import { Box, Typography, IconButton, List, ListItem, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

interface LanguageOption {
  name: string;
  code: string;
}

interface LanguageSelectorProps {
  languages: LanguageOption[];
  selectedLanguage: string;
  onLanguageSelect: (code: string) => void;
  onBack: () => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2),
  margin: "0 auto",
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));

const LanguageButton = styled(Button)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: `${theme.spacing(1.5)} ${theme.spacing(0.5)}`,
  fontSize: theme.typography.body2.fontSize,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  "& .MuiListItem-root": {
    padding: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageSelect,
  onBack,
}) => {
  const { t, i18n } = useTranslation();

  const handleLanguageSelect = (code: string) => {
    i18n.changeLanguage(code);
    onLanguageSelect(code);
  };

  return (
    <StyledPaper>
      <HeaderContainer>
        <IconButton
          onClick={onBack}
          aria-label={t('main:main.back')}
          sx={{ }}
          disableRipple
        >
          <ArrowBackIcon sx={{ color: 'ink.i900', fontSize: '1rem' }} />
        </IconButton>
        <Typography variant="h6" fontWeight={500}>
          {t('main:main.language').charAt(0).toUpperCase() + t('main:main.language').slice(1)}
        </Typography>
      </HeaderContainer>
      
      <Box sx={{ mt: 2 }}>
        <StyledList>
          {languages.map((language) => (
            <ListItem key={language.code}>
              <LanguageButton
                onClick={() => handleLanguageSelect(language.code)}
                disableRipple
              >
                <Typography sx={{ color: 'ink.i900', fontSize: '0.1rem' }}>{t(`languages:${language.code}`, language.name)}</Typography>
                {i18n.language === language.code && <CheckIcon sx={{ color: 'ink.i900', fontSize: '1rem' }} />}
              </LanguageButton>
            </ListItem>
          ))}
        </StyledList>
      </Box>
    </StyledPaper>
  );
};
