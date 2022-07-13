import React from "react";
import classes from "./button.module.css";

function Button(props) {
  return (
    <button className={props.class ? classes.button2 : classes.button}>
      {props.children}
    </button>
  );
}

export default Button;
