import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { GlobalStyles } from '../styles/GlobalStyle';

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default CustomApp;
