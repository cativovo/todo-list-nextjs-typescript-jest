import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../pages';
import { Todo } from '../../types';
import { renderWithThemeProvider } from '../testUtils';
import { todos } from '../__mocks__';

beforeEach(() => {
  renderWithThemeProvider(<Home />);
});

afterEach(() => {
  localStorage.clear();
});

describe('Home page', () => {
  test('header is rendered correctly', () => {
    const header = screen.getByTestId('header');

    expect(header).toBeVisible();
    expect(header).toHaveTextContent('Todo');
  });

  test('input is rendered correctly', () => {
    expect(screen.getByPlaceholderText(/What needs to be done/)).toBeInTheDocument();
  });

  test('todos are created', () => {
    const input = screen.getByPlaceholderText(/What needs to be done/);

    todos.forEach(({ text }) => {
      userEvent.type(input, `${text}{enter}`);
    });

    expect(screen.getByText(todos[0].text)).toBeInTheDocument();
    expect(screen.getByText(todos[1].text)).toBeInTheDocument();
    expect(screen.getByText(todos[2].text)).toBeInTheDocument();
    expect(screen.getByText(todos[3].text)).toBeInTheDocument();
    expect(screen.getByText(todos[4].text)).toBeInTheDocument();
  });

  test('todos are changing status', () => {
    const input = screen.getByPlaceholderText(/What needs to be done/);

    todos.forEach(({ text }) => {
      userEvent.type(input, `${text}{enter}`);
    });

    expect(screen.getByText(todos[0].text)).toBeInTheDocument();
    expect(screen.getByText(todos[1].text)).toBeInTheDocument();
    expect(screen.getByText(todos[2].text)).toBeInTheDocument();
    expect(screen.getByText(todos[3].text)).toBeInTheDocument();
    expect(screen.getByText(todos[4].text)).toBeInTheDocument();

    const getCheckbox = (text: string): HTMLElement => {
      return screen.getByText(text).closest('li').querySelector('input[type="checkbox"]');
    };

    const checkbox = getCheckbox(todos[0].text);
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('todos are saved in localStorage', () => {
    const input = screen.getByPlaceholderText(/What needs to be done/);

    todos.forEach(({ text }) => {
      userEvent.type(input, `${text}{enter}`);
    });

    expect(screen.getByText(todos[0].text)).toBeInTheDocument();
    expect(screen.getByText(todos[1].text)).toBeInTheDocument();
    expect(screen.getByText(todos[2].text)).toBeInTheDocument();
    expect(screen.getByText(todos[3].text)).toBeInTheDocument();
    expect(screen.getByText(todos[4].text)).toBeInTheDocument();

    const todosInStorage: Todo[] = JSON.parse(localStorage.getItem('todo'));
    expect(todosInStorage.every((todo, index) => todo.text === todos[index].text)).toBeTruthy();
  });
});
