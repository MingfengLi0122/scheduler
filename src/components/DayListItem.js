import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";
// DayListItem component
export default function DayListItem(props) {
  const classes = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  // Update returning string based on spots remaining
  const fomatSpots = function () {
    if (!props.spots) {
      return "no spots remaining";
    }

    if (props.spots === 1) {
      return "1 spot remaining";
    }

    return props.spots + " spots remaining";
  };

  return (
    <li
      data-testid="day"
      className={classes}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{fomatSpots()}</h3>
    </li>
  );
}
