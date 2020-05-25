import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: object) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Email must be valid'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', data);

      addToast({
        type: 'success',
        title: 'Account Registered',
        description: 'You already can use your credentials to login',
      });

      history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Register Error',
          description: 'Unable to register, try again later',
        });
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobaber's logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
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

          <Link to="/">
            <FiArrowLeft />
            SignIn
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
