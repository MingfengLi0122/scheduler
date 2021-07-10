import React from "react";
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";

import "./styles.scss";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  // console.log("props-----> ", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    if (name && interviewer) {
      transition(SAVING);
      const interview = {
        student: name,
        interviewer
      };
      
      props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
    }
  }

  function deleteAppointment() {
    transition(DELETING, true);
    
    props
      .cancleInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && 
          <Form 
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        }
        {mode === EDIT && 
          <Form
            name={props.interview.student}
            interviewer={props.interviewers.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        }
        {mode === SAVING && 
          <Status 
            message="Saving"          
          />
        }
        {mode === DELETING && 
          <Status 
            message="Deleting"          
          />
        }
        {mode === CONFIRM &&
          <Confirm 
            onCancel={back}
            onConfirm={deleteAppointment}
          />
        }
        {mode === ERROR_SAVE &&
          <Error 
            message="Can not cancle appointment"  
            onClose={back}
          />
        }
        {mode === ERROR_DELETE &&
          <Error 
            message="Can not cancle appointment"  
            onClose={back}
          />
        }
        
    </article>
  );
};

