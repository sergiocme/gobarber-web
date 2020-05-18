import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInParams {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInParams): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    console.log('response: ', response);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Sérgio', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
