import styled, { css } from 'styled-components';

interface ContainerProps {
  isFoscused: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  color: #666360;
  border: 2px solid #232129;
  border-radius: 10px;

  ${(props) =>
    props.isFoscused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background-color: transparent;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    color: #666360;
  }
`;
