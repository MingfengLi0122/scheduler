export default function getAppointmentsForDay(state, day) {
  let filteredResult = [];
  const filteredDay= state.days.filter(dayInfo => dayInfo.name === day);

  if(!filteredDay[0]) return filteredResult;
  for (const interviewerId of filteredDay[0].appointments) {
    filteredResult.push(state.appointments[interviewerId])
  }

  return filteredResult;
}
