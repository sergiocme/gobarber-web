import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is require'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

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
