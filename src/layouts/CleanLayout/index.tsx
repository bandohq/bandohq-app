import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import Navbar from '@components/Navbar';
import SimpleFooter from '@components/SimpleFooter';
import theme from '@config/theme';
import { PromoBanner } from "@components/PromoBanner/PromoBanner";

const LayoutContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  background:
    theme.palette.mode === 'dark' ?
    'linear-gradient(65deg, #04534E 0%, #1A1A1A 80%);' :
    'linear-gradient(65deg, rgba(247,251,252,1) 0%,rgba(220,244,235,0.8) 40%,rgba(64,180,148,0.5) 100%);',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const Container = styled('div')(() => ({
  width: '100%',
  margin: '0 auto',
  height: 'auto',
  display: 'flex',
  padding: theme.spacing(2),
  paddingTop: '20px',
}));

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '0 auto',
  padding: 0,
}));

export type CleanLayoutProps = PropsWithChildren;

export default function CleanLayout({ children }: CleanLayoutProps) {
  return (
    <LayoutContainer>
      <Navbar />
      <PromoBanner />
      <Container>
        <ContentContainer>{children}</ContentContainer>
      </Container>
      <SimpleFooter bgColor="transparent" textColor="primary.main" />
    </LayoutContainer>
  );
}
