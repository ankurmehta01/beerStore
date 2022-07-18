import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./sidebar.module.css";
import { FiUser } from "react-icons/fi";
import { IoStorefrontOutline } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { RiSettings3Line } from "react-icons/ri";
import { FaRegStickyNote } from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsStopwatch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";

function SideBar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <IconContext.Provider value={{ size: "20px" }}>
      <div className={classes.container}>
        <ul className={classes.list}>
          <li>
            <FiUser />
            <NavLink
              // className={(navData) => {
              //   return navData.isActive ? classes.active : " ";
              // }}
              to="/user-management"
            >
              User Management
            </NavLink>
          </li>
          <li>
            <IoStorefrontOutline />
            <NavLink to="/store-management"> Store Management</NavLink>
          </li>
          <li>
            <TbReport />
            <NavLink to="/create-report">Create Report</NavLink>
          </li>
          <li>
            <RiSettings3Line />
            <NavLink to="/ecommerce-setting">Ecommerce Setting</NavLink>
          </li>
          <li>
            <FaRegStickyNote />
            <NavLink to="/ecommerce-setting"> Delievery Settings/Fees</NavLink>
          </li>
          <li>
            <AiOutlineAppstore />
            <NavLink to="/store-features">Store Features</NavLink>
          </li>
          <li>
            <BsStopwatch />
            <NavLink to="/holiday-hours">Holiday Hours</NavLink>
          </li>
        </ul>
      </div>
    </IconContext.Provider>
  );
}

export default SideBar;
