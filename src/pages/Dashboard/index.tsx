import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import { Container, Header, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const {
    signOut,
    data: { user },
  } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img alt="GoBarber Logo" src={logoImg} />

          <Profile>
            <img alt={`${user.name}'s Profile`} src={user.avatar_url} />

            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default Dashboard;
