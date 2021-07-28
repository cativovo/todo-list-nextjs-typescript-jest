import { useState } from 'react';
import { Todo } from '../../types';
import { ButtonsContainer, Button, StyledList, Container } from './List.styles';
import ListItem from './ListItem';

type ListProps = {
  items: Todo[];
  onCheck?: (checked: boolean, id: string) => void;
  onChange?: (text: string, id: string) => void;
  onClear?: () => void;
  onRemove?: (id: string) => void;
};

const List = ({ items, onCheck, onChange, onClear, onRemove }: ListProps): JSX.Element => {
  const filters = ['All', 'Active', 'Completed'] as const;
  const [selectedFilter, setFilter] = useState<'active' | 'completed'>(null);

  const createFilterHandler = (filter: string) => (): void => {
    const value = filter === 'All' ? null : (filter.toLowerCase() as typeof selectedFilter);
    setFilter(value);
  };

  const filteredItems = items.filter(({ isDone }) => {
    if (selectedFilter === 'completed') {
      return isDone;
    }

    if (selectedFilter === 'active') {
      return !isDone;
    }

    return true;
  });

  const counts = items.reduce(
    (acc, item) => ({
      ...acc,
      All: acc.All + 1,
      Active: acc.Active + Number(!item.isDone),
      Completed: acc.Completed + Number(item.isDone),
    }),
    { All: 0, Active: 0, Completed: 0 }
  );

  const isActive = (filter: typeof filters[number]): boolean => {
    return filter.toLowerCase() === selectedFilter || (filter === 'All' && selectedFilter === null);
  };

  return (
    <Container>
      <ButtonsContainer>
        {filters.map((filter) => (
          <Button key={filter} onClick={createFilterHandler(filter)} isActive={isActive(filter)}>
            {`${filter}: ${counts[filter]}`}
          </Button>
        ))}
        <div>
          <Button onClick={onClear}>Clear Completed</Button>
        </div>
      </ButtonsContainer>
      <StyledList>
        {filteredItems.map(({ id, ...rest }) => (
          <ListItem
            onCheck={onCheck}
            onChange={onChange}
            {...rest}
            id={id}
            key={id}
            onRemove={onRemove}
          />
        ))}
      </StyledList>
    </Container>
  );
};

export default List;
