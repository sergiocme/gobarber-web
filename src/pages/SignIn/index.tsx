import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Gobaber's logo" />
      <form>
        <h1>SignIn with Gobaber Account</h1>

        <input placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">SignIn</button>

        <a href="#forgotPassword">Forgot Password?</a>
      </form>

      <a href="#newAccount">
        <FiLogIn />
        SignUp
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
