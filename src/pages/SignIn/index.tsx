import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Gobaber's logo" />
      <form>
        <h1>SignIn with Gobaber Account</h1>

        <Input name="email" icon={FiMail} placeholder="Email" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />
        <Button type="submit">SignIn</Button>

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
