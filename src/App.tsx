import React from 'react';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyle />
  </>
);

export default App;
