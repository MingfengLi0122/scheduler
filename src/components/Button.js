import React from "react";
import classNames from "classnames";
import "components/Button.scss";
// Button component
export default function Button(props) {
   const classes = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
   });
   
   return <button 
            className={classes}
            onClick={props.onClick}
            disabled={props.disabled}
          >
            { props.children }
          </button>;
}
