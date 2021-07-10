import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers:all[2].data 
      }));
    })
  }, []);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(() =>  
      axios.get("/api/days")
        .then(response => {
          setState(prev =>(
            {
              ...prev, appointments,
               days: response.data
            }))
        })
    )
  }
  
  function cancleInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then(() =>  
      axios.get("/api/days")
        .then(response => {
          setState(prev =>(
            {
              ...prev, appointments, 
              days: response.data
            }))
        })
    )
  }

  return { state, setDay, bookInterview, cancleInterview }
}