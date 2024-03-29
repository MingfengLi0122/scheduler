import React from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import useApplicationData from "../hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const { state, setDay, bookInterview, cancleInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentsDaily = getAppointmentsForDay(state, state.day);
  // Assign the helper function output to Appointment component
  const schedule = appointmentsDaily.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancleInterview={cancleInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {
          <>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
              <DayList days={state.days} day={state.day} setDay={setDay} />
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </>
        }
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
