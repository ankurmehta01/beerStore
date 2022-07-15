import React, { useEffect, useState } from "react";
import Input from "./Input";
import classes from "./form.module.css";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";
import StoreList from "./StoreList";
import { getAllData, getAssignedStores, getBaseStores } from "./database/db";
import { useForm } from "react-hook-form";
import { IoVolumeHigh } from "react-icons/io5";

function Form() {
  let allStore = getAllData();
  let baseStores = getBaseStores();
  let assignedStores = getAssignedStores();
  let { register, handleSubmit } = useForm();
  // console.log({ ...register() });

  const [enteredSearchValue, setEnteredSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [selectedBaseStore, setSelectedBaseStore] = useState(baseStores);
  const [selectedAssignedStore, setSelectedAssignedStore] = useState([]);

  const [isBase, setIsBase] = useState(true);
  console.log(isBase, "isBase..........");
  // console.log(isBase, "isBase....");
  // console.log(selectedAssignedStore, "assigned................");

  let searchedStores = allStore.filter((item) => {
    return item.address
      .toLowerCase()
      .includes(enteredSearchValue.toLowerCase());
  });
  // console.log(selectedBaseStore);

  const searchValueChangeHandler = (e) => {
    const enteredValue = e.target.value;
    console.log(e.target.value);
    setEnteredSearchValue(enteredValue);
  };

  const serachListClickHandler = (e) => {
    const id = parseInt(e.currentTarget.getAttribute("id"));
    allStore.map((item) => {
      if (item.id === id) {
        setSelectedId(item.id);
        setEnteredSearchValue(item.address);
      }
    });
  };
  const addUserHandler = (e) => {
    e.preventDefault();
    const id = selectedId;
    console.log(id, "from addUseHandler");
    if (isBase === null) {
      alert("please select the store first");
      return;
    } else if (isBase) {
      if (id !== 0) {
        const selectedStore = allStore.filter((item) => {
          return item.id === id;
        });
        console.log(selectedStore);
        setSelectedBaseStore(selectedStore);
        let latestAssignedStore = selectedAssignedStore.filter((item) => {
          return item.id !== id;
        });
        setSelectedAssignedStore(latestAssignedStore);
      }
    } else {
      if (id !== 0) {
        // let arrayWithoutSelectedValue = selectedAssignedStore.filter((item) => {
        //   return item.id !== id;
        // });
        // let arrayWithSelectedValue = allStore.filter((item) => {
        //   return item.id === id;
        // });
        // console.log(arrayWithoutSelectedValue, "arraySelected");
        // console.log(arrayWithSelectedValue, "arraySelected");
        // setSelectedAssignedStore([
        //   ...arrayWithoutSelectedValue,
        //   arrayWithSelectedValue[0],
        // ]);
        const selectedByUser = allStore.filter((item) => {
          return item.id === id;
        });
        const isSelectedItemPresentInBaseStore = selectedBaseStore.filter(
          (item) => {
            return item.id === id;
          }
        );
        if (isSelectedItemPresentInBaseStore.length === 0) {
          if (selectedAssignedStore.length === 0) {
            setSelectedAssignedStore(selectedByUser);
          } else {
            const alreadyInAssignedStore = selectedAssignedStore.filter(
              (item) => {
                return item.id === id;
              }
            );

            if (alreadyInAssignedStore.length === 0) {
              setSelectedAssignedStore([
                ...selectedAssignedStore,
                selectedByUser[0],
              ]);
            }
          }
        }
      }
    }
    setEnteredSearchValue("");
    setSelectedId(0);
  };

  const resetBaseStores = (array) => {
    setSelectedBaseStore(array);
  };
  const resetAssignedStore = (array) => {
    console.log(array, "from form.js...");
    setSelectedAssignedStore(array);
  };
  const resetSelectedId = () => {
    setSelectedId(0);
  };
  return (
    <IconContext.Provider value={{ size: "15px" }}>
      <form className={classes.container}>
        <div className={classes.row1}>
          <div className={classes.column1}>
            <Input
              type="text"
              placeholder=" Jonathan"
              label="Employee ID"
              // register={register}
            />
            <Input
              type="text"
              placeholder=""
              label="First Name"
              // register={register}
            />
            <Input
              type="text"
              placeholder=""
              label="Username"
              // register={register}
            />
          </div>
          <div className={classes.column2}>
            <div className={classes.selectContainer}>
              <label>Role</label>
              <select>
                <option>Select Role</option>
                <option value="role1">Role1</option>
                <option value="role1">Role2</option>
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
          <Button addUserHandler={addUserHandler}>
            <AiOutlinePlus />
            Add User To Store
          </Button>
        </div>

        <div className={classes.radioContainer}>
          <input
            type="radio"
            id="base"
            name="store"
            value="base"
            checked={isBase ? true : false}
            onChange={(e) => setIsBase(true)}
          />
          <label>Base Store</label>

          <input
            type="radio"
            id="assigned"
            name="store"
            value="assigned"
            checked={isBase ? false : true}
            onChange={(e) => setIsBase(false)}
          />
          <label>Assigned Store</label>
        </div>

        {enteredSearchValue && (
          <div className={classes.storesList}>
            <ul>
              {searchedStores.map((item) => {
                return (
                  <li
                    className={classes.listItem}
                    id={item.id}
                    onClick={serachListClickHandler}
                  >
                    {item.address}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className={classes.row3}>
          <StoreList
            heading="Base Store"
            dataArray={selectedBaseStore}
            isBase={isBase}
            resetStores={resetBaseStores}
          />
          <StoreList
            heading="Other Assigned Store"
            dataArray={selectedAssignedStore}
            isBase={isBase}
            resetStores={resetAssignedStore}
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
