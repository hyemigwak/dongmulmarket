import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  return (
    <Container>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" height="100vh" />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin-right: 2rem;
`;

export default Calendar;
