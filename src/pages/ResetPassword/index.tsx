import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

interface FormParams {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

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
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobaber's logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset Gobaber Password</h1>

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
