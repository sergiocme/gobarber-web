import React, { createContext, useContext, useCallback } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext({} as ToastContextData);

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  return context;
};

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast()');
  }, []);
  const removeToast = useCallback(() => {
    console.log('removeToast()');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
