import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import Navbar from '@components/Navbar';
import SimpleFooter from '@components/SimpleFooter';
import theme from '@config/theme';
const TOP_PADDING = '78px';

const LayoutContainer = styled('div')(() => ({
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  background:
    'linear-gradient(45deg, rgba(247,251,252,1) 0%,rgba(220,244,235,0.8) 40%,rgba(64,180,148,0.5) 100%);',
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
  paddingTop: TOP_PADDING,
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
      <Navbar/>
      <Container>
        <ContentContainer>{children}</ContentContainer>
      </Container>
      <SimpleFooter bgColor="transparent" textColor="primary.main" />
    </LayoutContainer>
  );
}
