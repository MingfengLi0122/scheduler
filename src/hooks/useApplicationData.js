import axios from "axios";
import { useReducer, useEffect } from "react";
import {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducer/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => dispatch({ type: SET_DAY, data: { day } });
  // Send put request to API and set interview states
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      dispatch({
        type: SET_INTERVIEW,
        data: { id, interview }
      })
    );
  }
  // Send delete request to API and set interview states
  function cancleInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() =>
      dispatch({
        type: SET_INTERVIEW,
        data: { id, interview: null }
      })
    );
  }
  // Set up the application data state based on retrieved data from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        data: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);
  // Set up websockt connection and use websocket to dynmically update web page from different browsers
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onopen = function (event) {
      socket.send("ping");
    };
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (typeof data === "object" && data.type) {
        const dispatchData = { id: data.id, interview: data.interview };
        return dispatch({
          type: data.type,
          data: dispatchData
        });
      }
    };
    return () => socket.close();
  }, []);

  return { state, setDay, bookInterview, cancleInterview };
}
