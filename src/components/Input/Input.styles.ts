import styled from 'styled-components';

export const Form = styled.form`
  border-radius: ${({ theme }) => theme.borderRadius[1]};
  display: flex;
  overflow: hidden;
  width: 100%;
`;

export const StyledInput = styled.input`
  border: none;
  font-size: 20px;
  padding: 10px 18px;
  width: 100%;
`;

export const SubmitButton = styled.button.attrs({ type: 'submit' })`
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  width: 40px;

  &:after {
    content: '\\25BA';
  }
`;
