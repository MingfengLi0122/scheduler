import axios from "axios";
import { useReducer, useEffect } from "react";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) { 
  switch (action.type) {
    case SET_DAY:
      return {
              ...state, 
              ...action.data
              };
    case SET_APPLICATION_DATA:
      return {
              ...state, 
              ...action.data
              };
    case SET_INTERVIEW: 
      if (action.data) {
      const appointment = {
        ...state.appointments[action.data.id],
        interview: action.data.interview
      }
      const appointments = {
        ...state.appointments,
        [action.data.id]: appointment
      };
      const curDayObj = state.days.find(d => d.name === state.day);
      const curIndex = state.days.findIndex(d => d.name === state.day);
      const listNullApp = curDayObj.appointments.filter(id => !appointments[id].interview);
      const spots = listNullApp.length;
      const updatedDay = {...curDayObj, spots};
      let days = [...state.days]
      days[curIndex] = updatedDay;
      return {
              ...state, 
              appointments,
              days
              };
      }
      return state;
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({ type: SET_DAY, data: { day } });
  
  function bookInterview(id, interview) {    
    return axios
    .put(`/api/appointments/${id}`, { interview })
    .then(() =>  
      dispatch({
        type: SET_INTERVIEW, 
        data: { id, interview }
      })
    )
  }
  
  function cancleInterview(id) {
    return axios
    .delete(`/api/appointments/${id}`)
    .then(() =>  
      dispatch({
        type: SET_INTERVIEW, 
        data: { id, interview: null }
      })
    )
  }
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA, 
        data: { 
                days: all[0].data, 
                appointments: all[1].data, 
                interviewers:all[2].data
              }
      });
    })
  }, []);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    
    socket.onopen = function (event) {
      socket.send('ping');
    };
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if (typeof data === 'object' && data.type) {
        const dispatchData = { id: data.id, interview: data.interview }
        return dispatch({
                type: data.type, 
                data: dispatchData
               });
      }
    };
    return () => socket.close();
  }, []);

  return { state, setDay, bookInterview, cancleInterview }
}