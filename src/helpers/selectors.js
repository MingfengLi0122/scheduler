function getAppointmentsForDay(state, day) {
  let filteredResult = [];
  const filteredDay = state.days.filter((dayInfo) => dayInfo.name === day);

  if (!filteredDay.length) return filteredResult;
  for (const appointmentId of filteredDay[0].appointments) {
    filteredResult.push(state.appointments[appointmentId]);
  }

  return filteredResult;
}

function getInterview(state, interview) {
  if (!interview) return null;
  const interviewerId = interview.interviewer;
  let interviewer = state.interviewers[interviewerId];

  return { ...interview, interviewer };
}

function getInterviewersForDay(state, day) {
  let filteredResult = [];
  const filteredDay = state.days.filter((dayInfo) => dayInfo.name === day);

  if (!filteredDay.length) return filteredResult;
  for (const interviewerId of filteredDay[0].interviewers) {
    filteredResult.push(state.interviewers[interviewerId]);
  }

  return filteredResult;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
