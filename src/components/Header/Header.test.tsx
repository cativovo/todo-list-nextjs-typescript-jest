import { screen } from '@testing-library/react';
import { renderWithThemeProvider } from '../../test/testUtils';
import { theme } from '../../theme';
import Header from './Header';

beforeEach(() => {
  renderWithThemeProvider(<Header text="Todo" />);
});

describe('Header component', () => {
  test('Header has text', () => {
    const header = screen.getByTestId('header');
    expect(header.textContent).toMatch(/Todo/);
  });

  test("Header's text have correct color", () => {
    const header = screen.getByTestId('header');
    expect(header).toHaveStyleRule('color', theme.colors.primary);
  });

  test('Header is aligned correctly', () => {
    const header = screen.getByTestId('header');
    expect(header).toHaveStyleRule('text-align', 'center');
  });
});
