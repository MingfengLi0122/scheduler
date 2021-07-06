import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   // approach one: use if condition

   // let buttonClass = "button";
   
   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   // }
   // if (props.danger) {
   //    buttonClass += " button--danger"
   // }

   // approach two: use classnames
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
