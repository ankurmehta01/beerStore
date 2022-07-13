import React from "react";
import { Link } from "react-router-dom";
import classes from "./mainsection.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IconContext } from "react-icons";
import Form from "./Form";

function MainSection() {
  return (
    <IconContext.Provider value={{ size: "20px" }}>
      <div className={classes.container}>
        <div className={classes.heading}>
          <h1>Add New User</h1>
          <p>
            <Link to="#">
              <AiOutlineArrowLeft />
              Back to user management
            </Link>
          </p>
        </div>
        <Form />
      </div>
    </IconContext.Provider>
  );
}

export default MainSection;
