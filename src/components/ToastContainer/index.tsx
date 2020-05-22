import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';
import { ToastProps } from '../../context/ToastContext';

interface ToastContainerProps {
  toasts: ToastProps[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <Container>
      {toasts &&
        toasts.map(message => (
          <Toast key={message.id} hasDescription type={message.type}>
            <FiAlertCircle size={20} />
            <div>
              <strong>{message.title}</strong>
              {message.description && <p>{message.description}</p>}
            </div>

            <button type="button">
              <FiXCircle size={18} />
            </button>
          </Toast>
        ))}
    </Container>
  );
};

export default ToastContainer;
