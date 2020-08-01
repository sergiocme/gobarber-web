import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday } from 'date-fns';
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
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  availability: boolean;
}

interface Appointment {
  id: string;
  user_id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appoitments, setAppoitments] = useState<Appointment[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const weekDaysName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const {
    signOut,
    data: { user },
  } = useAuth();

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(({ data }) => {
        setMonthAvailability(data);
      });
  }, [currentMonth, user]);

  useEffect(() => {
    api
      .get('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => {
        setAppoitments(data);
      });
  }, [selectedDate]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const unavailableDays = useMemo(() => {
    return monthAvailability.reduce((disabledDays, { day, availability }) => {
      if (availability === false) {
        disabledDays.push(
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
        );
      }
      return disabledDays;
    }, [] as Date[]);
  }, [monthAvailability, currentMonth]);

  const selectedDateText = useMemo(() => {
    return `Day ${selectedDate.getDate()}`;
  }, [selectedDate]);

  const selectedDateDayOfWeek = useMemo(() => {
    return weekDaysName[selectedDate.getDay()];
  }, [weekDaysName, selectedDate]);

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
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDateText}</span>
            <span>{selectedDateDayOfWeek}</span>
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
            disabledDays={{ daysOfWeek: [0, 6], ...unavailableDays }}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDayChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
