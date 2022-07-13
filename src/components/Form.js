import React, { useState } from "react";
import Input from "./Input";
import classes from "./form.module.css";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";
import StoreList from "./StoreList";

function Form({ dummy_store }) {
  const [enteredSearchValue, setEnteredSearchValue] = useState("");
  const [Dummy_store] = useState(dummy_store);

  let stores = Dummy_store.filter((item) => {
    return item.address
      .toLowerCase()
      .includes(enteredSearchValue.toLowerCase());
  });

  let assignedStores = Dummy_store.filter((item) => {
    return item.assigned === true;
  });

  const searchValueChangeHandler = (e) => {
    const enteredValue = e.target.value;
    console.log(e.target.value);
    setEnteredSearchValue(enteredValue);
  };
  return (
    <IconContext.Provider value={{ size: "15px" }}>
      <form className={classes.container}>
        <div className={classes.row1}>
          <div className={classes.column1}>
            <Input type="text" placeholder=" Jonathan" label="Employee ID" />
            <Input type="text" placeholder="" label="First Name" />
            <Input type="text" placeholder="" label="Username" />
          </div>
          <div className={classes.column2}>
            <div className={classes.selectContainer}>
              <label>Role</label>
              <select>
                <option>Select Role</option>
              </select>
            </div>
            <Input type="text" placeholder="" label="Last Name" />
            <Input type="email" placeholder="" label="Email" />
          </div>
        </div>
        <div className={classes.row2}>
          <Input
            type="text"
            placeholder=" Search store by code."
            label="Assign a Store"
            labelSize="large"
            value={enteredSearchValue}
            searchValueChangeHandler={searchValueChangeHandler}
          ></Input>
          <Button>
            <AiOutlinePlus />
            Add User To Store
          </Button>
        </div>
        <div className={classes.row3}>
          <StoreList
            heading="Base Store"
            dataArray={stores}
            searchValue={enteredSearchValue}
          />
          <StoreList
            heading="Other Assigned Store"
            dataArray={assignedStores}
          />
        </div>
        <div className={classes.row4}>
          <Button class="black">Cancel</Button>
          <Button>Save</Button>
        </div>
      </form>
    </IconContext.Provider>
  );
}

export default Form;
