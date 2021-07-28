import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps): JSX.Element => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export const renderWithThemeProvider = (...[ui, options]: Parameters<typeof render>) =>
  render(ui, { wrapper: Provider, ...options });
