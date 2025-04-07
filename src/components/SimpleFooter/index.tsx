import { Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

type SimpleFooterProps = {
  bgColor?: string;
  textColor?: string;
};

export default function SimpleFooter({ bgColor, textColor }: SimpleFooterProps) {
  const { t } = useTranslation('footer');

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: bgColor || 'primary.main',
      }}
    >
      <Typography
        component="a"
        href="https://docs.bando.cool/widget"
        target="_blank"
        sx={{ display: { xs: 'none', sm: 'block' }, color: textColor, pt: 2, textDecoration: 'underline', fontSize: '14px !important' }}
        align="center"
      >
        {t('disclaimer')}
      </Typography>
    </Container>
  );
}
