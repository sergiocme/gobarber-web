import React, { createContext, useCallback, useState, useContext } from 'react';
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
  data: AuthState;
  signIn(credentials: SignInParams): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context.signIn) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

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

  const signOut = useCallback(() => {
    localStorage.getItem('@Gobaber:token');
    localStorage.getItem('@Gobaber:user');
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, data }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
