import { nanoid } from 'nanoid';
import { useLayoutEffect, useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import List from '../components/List/List';
import { ListContainer } from '../styles/pages/index.styles';
import { Todo } from '../types';

const TODOS_LOCAL_STORAGE_KEY = 'todo';

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = (): Todo[] => {
    const todosJson = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);

    if (!todosJson) {
      return [];
    }

    return JSON.parse(todosJson);
  };

  useLayoutEffect(() => {
    setTodos(getTodos());
  }, []);

  const saveTodos = (newTodos: Todo[]): void => {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
  };

  const setAndSaveTodos = (newTodos: Todo[]): void => {
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const handleSubmit = (text: string): void => {
    const newTodo = {
      id: nanoid(),
      text,
      isDone: false,
    };

    setAndSaveTodos([...todos, newTodo]);
  };

  const updateTodo = <K extends keyof Omit<Todo, 'id'>>(
    key: K,
    value: Todo[K],
    id: string
  ): Todo[] => {
    const todosClone = [...todos];
    const todoIndex = todosClone.findIndex((todo) => todo.id === id);
    todosClone[todoIndex][key] = value;

    return todosClone;
  };

  const handleChange = (text: string, id: string): void => {
    const newTodos = updateTodo('text', text, id);
    setAndSaveTodos(newTodos);
  };

  const handleCheck = (checked: boolean, id: string): void => {
    const newTodos = updateTodo('isDone', checked, id);
    setAndSaveTodos(newTodos);
  };

  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setAndSaveTodos(newTodos);
  };

  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.isDone);
    setAndSaveTodos(newTodos);
  };

  return (
    <>
      <Header text="Todo" />
      <ListContainer>
        <Input placeholder="What needs to be done" onSubmit={handleSubmit} />
        {todos.length > 0 && (
          <List
            items={todos}
            onClear={handleClearCompleted}
            onRemove={handleRemove}
            onChange={handleChange}
            onCheck={handleCheck}
          />
        )}
      </ListContainer>
    </>
  );
};

export default Home;
