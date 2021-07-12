import axios from "axios";
import { useReducer, useEffect } from "react";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  console.log("action.type -----",action.type);
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
          console.log("set inter!!!!!!!");
      return {
              ...state, 
              ...action.data
             };
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios
    .put(`/api/appointments/${id}`, { interview })
    .then(() =>  
      axios.get("/api/days")
        .then(response => {
          dispatch({
            type: SET_INTERVIEW,
            data: { appointments, days: response.data }
          })
        })
    )
  }
  
  function cancleInterview(id) {
    return axios
    .delete(`/api/appointments/${id}`)
    .then(() =>  
      axios.get("/api/days")
        .then(response => {
          dispatch({
            type: SET_INTERVIEW, 
            data: { days: response.data }
          })
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
        console.log("data--------", data);
        return dispatch(data);
      }
    };
    return () => socket.close();
  }, []);

  return { state, setDay, bookInterview, cancleInterview }
}