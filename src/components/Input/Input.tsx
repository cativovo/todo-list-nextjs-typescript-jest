import { Form, StyledInput, SubmitButton } from './Input.styles';

type InputProps = {
  placeholder?: string;
  onSubmit?: (text: string) => void;
};

const Input = ({ placeholder, onSubmit }: InputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      elements: {
        input: {
          value: string;
        };
      };
    };

    onSubmit(target.elements.input.value);
    e.currentTarget.reset();
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="form">
      <StyledInput type="text" data-testid="input" name="input" placeholder={placeholder} />
      <SubmitButton data-testid="submit-btn">&nbsp;</SubmitButton>
    </Form>
  );
};

export default Input;
