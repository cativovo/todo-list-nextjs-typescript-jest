import styled, { css } from 'styled-components';
import { lighten } from 'polished';

const inputStyles = css`
  border: ${({ theme }) => theme.borders[1]};
  border-color: transparent;
  font-size: 18px;
  height: 100%;
  flex: 1;
  padding: 8px 15px;
`;

export const Input = styled.input.attrs({ type: 'text' })`
  background-color: transparent;
  ${inputStyles}

  :focus {
    border-color: ${({ theme }) => theme.colors.black};
  }
`;

export const View = styled.div`
  inline-size: 90%;
  overflow-wrap: break-word;
  ${inputStyles}
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin: 0 15px;

  :checked ~ ${View} {
    color: ${({ theme }) => lighten(0.3)(theme.colors.black)};
    text-decoration: line-through;
  }
`;

export const RemoveButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.red};
  font-size: 20px;
  opacity: 0;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.3s opacity ease-in-out;
  visibility: hidden;
`;

export const Li = styled.li`
  align-items: center;
  border-bottom: ${({ theme }) => theme.borders[1]};
  border-color: ${({ theme }) => theme.colors.grey.light};
  display: flex;
  position: relative;

  :hover ${RemoveButton} {
    opacity: 1;
    visibility: visible;
  }
`;
