import React from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  const handleSubmit = (data: object): void => {
    console.log('handleSubmit: ', data);
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Gobaber's logo" />
        <Form onSubmit={handleSubmit}>
          <h1>SignUp an Account</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">SignUp</Button>
        </Form>

        <a href="#newAccount">
          <FiArrowLeft />
          SignIn
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
