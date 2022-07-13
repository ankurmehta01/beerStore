import React from "react";
import classes from "./input.module.css";

function Input({
  type,
  placeholder,
  label,
  labelSize,
  value,
  searchValueChangeHandler,
}) {
  return (
    <div className={classes.inputContainer}>
      <label className={labelSize ? classes.large : null}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={searchValueChangeHandler}
      />
    </div>
  );
}

export default Input;
