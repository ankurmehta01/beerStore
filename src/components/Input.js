import React from "react";
import classes from "./input.module.css";
import { useState, useEffect } from "react";

const Input = (props) => {
  const [value, setValue] = useState(props.value || "");

  // useEffect(() => {
  //   setValue(props.value);
  // }, [props.value]);
  return (
    <div className={classes.inputContainer}>
      <label className={props.labelSize ? classes.large : null}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange && props.onChange(e);
        }}
        value={value}
      />
    </div>
  );
};

export default Input;
