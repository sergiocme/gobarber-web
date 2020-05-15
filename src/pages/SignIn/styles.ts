import styled from 'styled-components';
import { shade } from 'polished';
import signInbackgroundImg from '../../assets/signin-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;

  form {
    display: flex;
    flex-direction: column;
    margin: 80px 0;
    width: 380px;
    align-items: center;

    h1 {
      font-size: 26px;
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 6px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInbackgroundImg}) no-repeat center;
  background-size: cover;
`;
