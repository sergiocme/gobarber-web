import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

interface FormParams {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ email, password }: FormParams) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string().required('Email is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate({ email, password }, { abortEarly: false });
        await signIn({
          email,
          password,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Authentication Error',
            description: 'Invalid email or password',
          });
        }
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber's logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>SignIn with GoBarber Account</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">SignIn</Button>

            <Link to="/forgot-password">Forgot Password?</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            SignUp
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
