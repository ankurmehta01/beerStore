import React, { useEffect, useState } from "react";
import classes from "./storeList.module.css";
import { RiDeleteBinLine } from "react-icons/ri";

function StoreList({ heading, dataArray }) {
  const [array, setArray] = useState(dataArray);
  useEffect(() => {
    setArray(dataArray);
  }, [dataArray]);

  const deletehandler = (event) => {
    event.preventDefault();
    let id = parseInt(event.currentTarget.getAttribute("id"));
    console.log(id, typeof id);
    dataArray = array.filter((item) => {
      return item.id !== id;
    });

    setArray(dataArray);
  };
  return (
    <ul className={classes.listContainer}>
      <li className={classes.heading}>{heading}</li>
      {array.map((item) => {
        return (
          <li className={classes.storeInfo} key={item.id}>
            {item.address}{" "}
            <button id={item.id} onClick={deletehandler}>
              <RiDeleteBinLine />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default StoreList;