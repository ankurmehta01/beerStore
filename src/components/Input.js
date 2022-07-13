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
  // console.log(register, "register from input");
  // console.log({ ...register("hello2") });
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
