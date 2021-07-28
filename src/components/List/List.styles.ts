import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledList = styled.ul`
  border-top: ${({ theme }) => theme.borders[1]};
  border-color: ${({ theme }) => theme.colors.grey.light};
  list-style: none;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding: 8px 40px 8px 15px;

  > button {
    margin-right: 8px;
  }

  div {
    flex: 1;
    text-align: right;
  }
`;

type ButtonProps = {
  isActive?: boolean;
};

export const Button = styled.button<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({ theme }) => theme.borders[1]};
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius[1]};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
`;
