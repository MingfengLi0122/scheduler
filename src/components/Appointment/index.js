import React, { useEffect } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { id, time, interview, interviewers, bookInterview, cancleInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // Update transition modes and render the components when state changes
  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);
  // Save the student name and interviewer and transit the modes
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }
  // Delete the student name and interviewer and transit the modes
  function deleteAppointment() {
    transition(DELETING, true);

    cancleInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={deleteAppointment} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Can not save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Can not cancel appointment" onClose={back} />
      )}
    </article>
  );
}
