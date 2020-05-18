import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInParams {
  email: string;
  password: string;
}

interface AuthContextData {
  data: object;
  signIn(credentials: SignInParams): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobaber:token');
    const user = localStorage.getItem('@Gobaber:user');

    if (token && user) return { token, user: JSON.parse(user) };
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { data: response } = await api.post('sessions', { email, password });
    const { token, user } = response;

    localStorage.setItem('@Gobaber:token', token);
    localStorage.setItem('@Gobaber:user', JSON.stringify(user));
    setData({ user, token });
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, data }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
