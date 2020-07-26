import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface FormParams {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ email }: FormParams) => {
      setLoading(true);
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string().required('Email is required'),
        });

        await schema.validate({ email }, { abortEarly: false });

        await api.post('/passwords/forgot', {
          email,
        });

        addToast({
          type: 'success',
          title: 'Recover Password Requested',
          description: 'Look at to your inbox for an recover password email.',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Recover Password Error',
            description: 'Something wrong is not right',
          });
        }
      } finally {
        setLoading(false);
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
            <h1>Forgot Password</h1>

            <Input name="email" icon={FiMail} placeholder="Email" />
            <Button loading={loading} type="submit">
              Recover Password
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Back to SignIn
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
