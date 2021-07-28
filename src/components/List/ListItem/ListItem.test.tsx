import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithThemeProvider } from '../../../test/testUtils';
import ListItem from './ListItem';

describe('ListItem component', () => {
  test('ListItem has correct text', () => {
    renderWithThemeProvider(<ListItem text="Todo 1" id="1" />);

    expect(screen.getByText(/Todo 1/)).toBeInTheDocument();
  });

  test("ListItem's checkbox is not checked", () => {
    renderWithThemeProvider(<ListItem text="Todo 1" id="1" />);

    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBeFalsy();
  });

  test("ListItem's checkbox is checked", () => {
    renderWithThemeProvider(<ListItem text="Todo 1" id="1" isDone />);

    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBeTruthy();
  });

  test("ListItem's checkbox toggles correctly", () => {
    const handleCheck = jest.fn();
    const id = '1';
    renderWithThemeProvider(<ListItem text="Todo 1" id={id} onCheck={handleCheck} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    userEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalledWith(true, id);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalledWith(false, id);
    expect(checkbox).not.toBeChecked();
  });

  test("ListItem's input changes", () => {
    const handleChange = jest.fn();
    const id = '1';
    const text = 'Todo 1';
    const textBoxRole = 'textbox';
    renderWithThemeProvider(<ListItem text={text} id={id} onChange={handleChange} />);

    expect(screen.queryByRole(textBoxRole)).toBeNull();
    
    userEvent.click(screen.getByText(text))
    const input = screen.getByRole(textBoxRole);

    userEvent.clear(input);
    expect(handleChange).toHaveBeenCalledWith('', id);
    expect(input).not.toHaveValue();

    const value = 'Todo ulit';

    userEvent.type(input, value);
    expect(handleChange).toHaveBeenCalledWith(value, id);
    expect(input).toHaveValue(value);
  });

  test('ListItem handles remove event', async () => {
    const handleRemove = jest.fn();
    const id = '1';
    renderWithThemeProvider(<ListItem text="Todo 1" id={id} onRemove={handleRemove} />);

    // TODO: add test for checking if remove-btn is visible onHover

    userEvent.click(screen.getByTestId('remove-btn'));
    expect(handleRemove).toHaveBeenCalledWith(id);
  });
});
