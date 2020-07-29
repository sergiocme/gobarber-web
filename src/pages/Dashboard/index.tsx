import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

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

      <Content>
        <Schedule>
          <h1>Schedules</h1>
          <p>
            <span>Today</span>
            <span>6</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next Appointment</strong>
            <div>
              <img
                alt="Sérgio Carvalho's Avatar"
                src="https://avatars3.githubusercontent.com/u/50501020?s=460&u=9d5d8f9983825b04cd47c1925693a27593c63404&v=4"
              />
              <strong>Sérgio Carvalho</strong>
              <span>
                <FiClock />
                09:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  alt="Sérgio Carvalho's Avatar"
                  src="https://avatars3.githubusercontent.com/u/50501020?s=460&u=9d5d8f9983825b04cd47c1925693a27593c63404&v=4"
                />
                <strong>Sérgio Carvalho</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  alt="Sérgio Carvalho's Avatar"
                  src="https://avatars3.githubusercontent.com/u/50501020?s=460&u=9d5d8f9983825b04cd47c1925693a27593c63404&v=4"
                />
                <strong>Sérgio Carvalho</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  alt="Sérgio Carvalho's Avatar"
                  src="https://avatars3.githubusercontent.com/u/50501020?s=460&u=9d5d8f9983825b04cd47c1925693a27593c63404&v=4"
                />
                <strong>Sérgio Carvalho</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDayChange}
            selectedDays={selectedDate}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
