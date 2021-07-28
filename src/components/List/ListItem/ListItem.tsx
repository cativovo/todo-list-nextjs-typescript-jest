import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react';
import { Todo } from '../../../types';
import { Checkbox, Input, Li, RemoveButton, View } from './ListItem.styles';

type ListItemProps = Todo & {
  onCheck?: (checked: boolean, id: string) => void;
  onChange?: (text: string, id: string) => void;
  onRemove?: (id: string) => void;
};

const ListItem = ({
  id,
  text,
  isDone,
  onCheck,
  onChange,
  onRemove,
}: ListItemProps): JSX.Element => {
  const [textState, setTextState] = useState(() => text);
  const [visibleComponent, setVisibleElement] = useState<'input' | 'view'>('view');
  const inputRef = useRef<HTMLInputElement>();

  useLayoutEffect(() => {
    if (visibleComponent === 'input' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visibleComponent]);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    onCheck?.(e.target.checked, id);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTextState(value);
    onChange?.(value, id);
  };

  const handleInputBlur = (): void => {
    setVisibleElement('view');
  };

  const handleViewClick = (): void => {
    if (!isDone) {
      setVisibleElement('input');
    }
  };

  const handleRemove = (): void => {
    onRemove?.(id);
  };

  return (
    <Li data-testid={id}>
      <Checkbox onChange={handleCheck} defaultChecked={isDone} />
      {visibleComponent === 'view' && <View onClick={handleViewClick}>{textState}</View>}
      {visibleComponent === 'input' && (
        <Input
          ref={inputRef}
          onBlur={handleInputBlur}
          value={textState}
          onChange={handleInputChange}
          disabled={isDone}
        />
      )}

      <RemoveButton onClick={handleRemove} data-testid="remove-btn">
        &times;
      </RemoveButton>
    </Li>
  );
};

export default ListItem;
