import React, { useEffect, useState } from "react";
import classes from "./storeList.module.css";
import { RiDeleteBinLine } from "react-icons/ri";

function StoreList({ heading, dataArray, resetStores }) {
  const [array, setArray] = useState(dataArray);

  useEffect(() => {
    setArray(dataArray);
  }, [dataArray]);

  const deletehandler = (event) => {
    event.preventDefault();
    let id = parseInt(event.currentTarget.getAttribute("id"));
    dataArray = array.filter((item) => {
      return item.id !== id;
    });

    setArray(dataArray);
    resetStores(dataArray);
  };
  return (
    <ul className={classes.listContainer}>
      <li className={classes.heading}>
        <div className={classes.headingContainer}>{heading}</div>
      </li>
      {array.map((item) => {
        return (
          <li className={classes.storeInfo} key={item.id}>
            <div className={classes.addressContainer}>
              <p>{item.address}</p>
            </div>
            <div className={classes.buttonContainer}>
              <button id={item.id} onClick={deletehandler}>
                <RiDeleteBinLine />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default StoreList;
