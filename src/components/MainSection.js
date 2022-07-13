import React from "react";
import { Link } from "react-router-dom";
import classes from "./mainsection.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IconContext } from "react-icons";
import Form from "./Form";

function MainSection() {
  let dummy_store = [
    { id: 1, address: "2002,198 Queen St.E.Brampton", assigned: true },
    { id: 2, address: "2003,198 king St.E.Toronto", assigned: false },
    { id: 3, address: "2004,198 Queen St.E.NewYork", assigned: true },
    { id: 4, address: "2002,198 Queen St.E.Brampton", assigned: false },
  ];

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
        <Form dummy_store={dummy_store} />
      </div>
    </IconContext.Provider>
  );
}

export default MainSection;
