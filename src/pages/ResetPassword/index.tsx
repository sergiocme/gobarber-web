import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import { useLocation, useHistory } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface FormParams {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async ({ password, password_confirmation }: FormParams) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('Password is required'),
          password_confirmation: Yup.string().equals(
            [password, null],
            'Passwords must match',
          ),
        });

        await schema.validate(
          { password, password_confirmation },
          { abortEarly: false },
        );

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/passwords/reset', {
          token,
          password,
          password_confirmation,
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Change Password Error',
            description: 'Please try again later',
          });
        }
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber's logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset GoBarber Password</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Change Password</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
