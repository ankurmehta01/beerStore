import React from "react";
import { BiUserCircle } from "react-icons/bi";
import classes from "./header.module.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <IconContext.Provider value={{ size: "25px" }}>
      <nav className={classes.container}>
        <div className={classes.logo}>
          <Link to="/beer-store" onClick={props.showSidebar}>
            <span>B</span>EER STORE
          </Link>
        </div>
        <div className={classes.main}>
          <ul className={classes.list}>
            <li>
              <BiUserCircle />
            </li>
            <li>Hi,Jonathan</li>
            <li>
              <select>
                <option></option>
              </select>
            </li>
          </ul>
        </div>
      </nav>
    </IconContext.Provider>
  );
}

export default Header;
