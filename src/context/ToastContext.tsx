import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastProps, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastProps {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext({} as ToastContextData);

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  return context;
};

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastProps[]>([]);

  const addToast = useCallback((message: Omit<ToastProps, 'id'>) => {
    const newToast = {
      id: uuid(),
      type: message.type,
      title: message.title,
      description: message.description,
    };

    setMessages(state => [...state, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={messages} />
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
