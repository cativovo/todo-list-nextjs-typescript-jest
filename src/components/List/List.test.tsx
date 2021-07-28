import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithThemeProvider } from '../../test/testUtils';
import { todos } from '../../test/__mocks__';
import { theme } from '../../theme';
import List from './List';

describe('List component', () => {
  beforeEach(() => {
    renderWithThemeProvider(<List items={todos} />);
  });

  test('ListItems are rendered', () => {
    expect(screen.getByText(todos[0].text)).toBeInTheDocument();
    expect(screen.getByText(todos[1].text)).toBeInTheDocument();

    expect(screen.getByText(/All: \d/)).toHaveStyleRule('border-color', theme.colors.primary);
  });

  test('List filters items', () => {
    const borderStyle: [string, jest.Value] = ['border-color', theme.colors.primary];

    const allBtn = screen.getByText(/All: \d/);
    expect(allBtn).toHaveStyleRule(...borderStyle);

    const activeBtn = screen.getByText(/Active: \d/);
    userEvent.click(activeBtn);
    expect(allBtn).not.toHaveStyleRule(...borderStyle);
    expect(activeBtn).toHaveStyleRule(...borderStyle);

    expect(screen.getByText(todos[0].text)).toBeVisible();
    expect(screen.queryByText(todos[1].text)).toBeNull();

    const completedBtn = screen.getByText(/Completed: \d/);
    userEvent.click(completedBtn);
    expect(activeBtn).not.toHaveStyleRule(...borderStyle);
    expect(completedBtn).toHaveStyleRule(...borderStyle);

    expect(screen.queryByText(todos[0].text)).toBeNull();
    expect(screen.getByText(todos[1].text)).toBeVisible();
  });

  test('List shows count', () => {
    expect(screen.getByText(/All: 5/)).toBeInTheDocument();
    expect(screen.getByText(/Active: 3/)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
  });
});

describe('List event handler', () => {
  test('List handles clear completed', () => {
    const handleClear = jest.fn();
    renderWithThemeProvider(<List items={todos} onClear={handleClear} />);

    userEvent.click(screen.getByText(/Clear Completed/));

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
