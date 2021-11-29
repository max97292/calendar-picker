import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import './App.css';

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

export default function App() {
  const [choosingType, setChoosingType] = useState('start');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function updateDate(choosenDay) {
    if (startDate && choosenDay < startDate) {
      setStartDate(choosenDay);
      return setChoosingType('end');
    }

    if (endDate && choosenDay > endDate) {
      setEndDate(choosenDay);
      return setChoosingType('end');
    }

    if (choosingType === 'start') {
      setStartDate(choosenDay);
      return setChoosingType('end');
    }

    if (choosingType === 'end') {
      setEndDate(choosenDay);
    }
  }

  return (
    <>
      <StyledDateChooser>
        <StyledDateChooserButton onClick={() => setChoosingType('start')}>
          Start Date <span>{startDate}</span>
        </StyledDateChooserButton>
        <StyledDateChooserButton onClick={() => setChoosingType('end')}>
          End Date <span>{endDate}</span>
        </StyledDateChooserButton>
      </StyledDateChooser>

      <StyledCalendar>
        {calendarDates.map((day, index) => {
          const dayNumber = day + 1;

          const isSelected = dayNumber === startDate || dayNumber === endDate;

          return (
            <StyledCalendarDay
              key={index}
              isSelected={isSelected}
              onClick={() => updateDate(dayNumber)}
            >
              {day + 1}
            </StyledCalendarDay>
          );
        })}
      </StyledCalendar>
    </>
  );
}

const StyledDateChooser = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button`
  color: #0b204c;
  text-transform: uppercase;
  flex: 1;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  border-bottom: 2px solid rgba(11, 32, 76, 0.2);
  outline: none;

  span {
    display: block;
    min-height: 60px;
    font-size: 50px;
  }
`;

const StyledCalendar = styled.div`
  max-width: 400px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  background: #0b204c;
  color: #fff;
  padding: 20px;
`;

const StyledCalendarDay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: 0.3s ease background;
  border: none;
  outline: none;
  cursor: pointer;
  color: #8096c1;
  background: none;

  ${(props) =>
    props.isSelected &&
    css`
      color: #eee;
      background: #1a1a1a;
    `};
`;
