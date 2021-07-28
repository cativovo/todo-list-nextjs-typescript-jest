import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithThemeProvider } from '../../test/testUtils';
import Input from './Input';

describe('Input component', () => {
  const placeholder = 'What needs to be done';

  test('Input has placeholder', () => {
    renderWithThemeProvider(<Input placeholder={placeholder} />);

    expect(screen.queryByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test('Input submits using keyboard', () => {
    const handleSubmit = jest.fn();
    renderWithThemeProvider(<Input placeholder={placeholder} onSubmit={handleSubmit} />);

    const value = 'Aral testing';
    const input = screen.getByPlaceholderText(placeholder)

    userEvent.click(input)
    expect(input).toHaveFocus();

    userEvent.type(input, `${value}{enter}`);
    expect(handleSubmit).toHaveBeenCalledWith(value);
  });

  test('Input submits using mouse', () => {
    const handleSubmit = jest.fn();
    renderWithThemeProvider(<Input placeholder={placeholder} onSubmit={handleSubmit} />);

    const value = 'Aral testing';
    const input = screen.getByPlaceholderText(placeholder)

    userEvent.click(input)
    expect(input).toHaveFocus();

    userEvent.type(screen.getByPlaceholderText(placeholder), value);
    userEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledWith(value);
  });
});
