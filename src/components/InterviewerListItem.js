import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewClasses = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  const imageClasses = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  });

  return (
    <li className={interviewClasses} onClick={props.setInterviewer}>
      <img
        className={imageClasses}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}