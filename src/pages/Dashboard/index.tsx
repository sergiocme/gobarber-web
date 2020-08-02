import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { isToday, parseISO, format, isAfter } from 'date-fns';
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
  hourFormatted: string;
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
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => {
        const formattedAppoitments = data.map(appoitment => {
          return {
            ...appoitment,
            hourFormatted: format(parseISO(appoitment.date), 'HH:mm'),
          };
        });
        setAppoitments(formattedAppoitments);
      });
  }, [selectedDate]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
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

  const morningAppoitments = useMemo(() => {
    return appoitments.filter(appoitment => {
      return parseISO(appoitment.date).getHours() < 12;
    });
  }, [appoitments]);

  const afternoonAppoitments = useMemo(() => {
    return appoitments.filter(appoitment => {
      return parseISO(appoitment.date).getHours() >= 12;
    });
  }, [appoitments]);

  const nextAppointment = useMemo(() => {
    return appoitments.find(appoitment =>
      isAfter(parseISO(appoitment.date), new Date()),
    );
  }, [appoitments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img alt="GoBarber Logo" src={logoImg} />

          <Profile>
            <img alt={`${user.name}'s Profile`} src={user.avatar_url} />

            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
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

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Next Appointment</strong>
              <div>
                <img
                  alt={`${nextAppointment.user.name}'s Avatar`}
                  src={nextAppointment.user.avatar_url}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Morning</strong>

            {morningAppoitments.length === 0 && (
              <p>You do not have any appoitment in the morning</p>
            )}

            {morningAppoitments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    alt={`${appointment.user.name}'s Avatar`}
                    src={appointment.user.avatar_url}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Afternoon</strong>

            {afternoonAppoitments.length === 0 && (
              <p>You do not have any appoitment in the afternoon</p>
            )}

            {afternoonAppoitments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    alt={`${appointment.user.name}'s Avatar`}
                    src={appointment.user.avatar_url}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
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
