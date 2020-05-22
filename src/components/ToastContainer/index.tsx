import React from 'react';
import { Container } from './styles';
import { ToastProps } from '../../context/ToastContext';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <Container>
      {toasts && toasts.map(toast => <Toast key={toast.id} toast={toast} />)}
    </Container>
  );
};

export default ToastContainer;
