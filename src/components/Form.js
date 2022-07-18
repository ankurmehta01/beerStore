import React, { useEffect, useState } from "react";
import Input from "./Input";
import classes from "./form.module.css";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";
import StoreList from "./StoreList";
import { getAllData, getAssignedStores, getBaseStores } from "./database/db";
import { useForm, useFormState, useWatch } from "react-hook-form";

const Controller = ({ control, register, name, rules, render }) => {
  const value = useWatch({
    control,
    name,
  });
  // const { errors } = useFormState({
  //   control,
  //   name,
  // });
  const props = register(name, rules);

  return render({
    value,
    onChange: (e) =>
      props.onChange({
        target: {
          name,
          value: e.target.value,
        },
      }),
    onBlur: props.onBlur,
    name: props.name,
  });
};

function Form() {
  let allStore = getAllData();
  let baseStores = getBaseStores();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      employeeId: "",
      userName: "",
      role: "",
      email: "",
    },
  });

  const [enteredSearchValue, setEnteredSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [selectedBaseStore, setSelectedBaseStore] = useState(baseStores);
  const [selectedAssignedStore, setSelectedAssignedStore] = useState([]);

  const [isBase, setIsBase] = useState(true);
  console.log(isBase, "isBase..........");

  let searchedStores = allStore.filter((item) => {
    return item.address
      .toLowerCase()
      .includes(enteredSearchValue.toLowerCase());
  });

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

  function submitHandler(data) {
    console.log(data, "data from form.js");
  }

  return (
    <IconContext.Provider value={{ size: "15px" }}>
      <form
        className={classes.container}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className={classes.row1}>
          <div className={classes.column1}>
            <div className={classes.inputContainer}>
              <Controller
                {...{
                  control,
                  register,
                  name: "employeeId",
                  rules: {
                    required: {
                      value: true,
                      message: "*required",
                    },

                    maxLength: { value: 3, message: "Limit exceeded" },
                  },
                  render: (props) => (
                    <Input {...props} label="Employee Id" type="number" />
                  ),
                }}
              />
              {errors.employeeId && <span>{errors.employeeId.message}</span>}
            </div>
            <div className={classes.inputContainer}>
              <Controller
                {...{
                  control,
                  register,
                  name: "firstName",
                  rules: {
                    required: {
                      value: true,
                      message: "*required",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Only alphabet values are required.",
                    },
                  },
                  render: (props) => (
                    <Input {...props} label="First Name" type="text" />
                  ),
                }}
              />
              {errors.firstName && <span>{errors.firstName.message}</span>}
            </div>
            <div className={classes.inputContainer}>
              <Controller
                {...{
                  control,
                  register,
                  name: "userName",
                  rules: {
                    required: {
                      value: true,
                      message: "*required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Username format is not correct.",
                    },
                  },
                  render: (props) => (
                    <Input {...props} label="Username" type="text" />
                  ),
                }}
              />
              {errors.userName && <span>{errors.userName.message}</span>}
            </div>
          </div>
          <div className={classes.column2}>
            {/* <div className={classes.selectContainer}> */}
            <div className={classes.inputContainer}>
              <div>
                <label>Role</label>
                <select {...register("role", { required: "*required" })}>
                  <option value="">Select Role</option>
                  <option value="role1">Role1</option>
                  <option value="role1">Role2</option>
                </select>
              </div>
              {errors.role && <span>{errors.role.message}</span>}
            </div>
            {/* </div> */}
            <div className={classes.inputContainer}>
              <Controller
                {...{
                  control,
                  register,
                  name: "lastName",
                  rules: {
                    required: {
                      value: true,
                      message: "*required",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Only alphabet values are required.",
                    },
                  },
                  render: (props) => (
                    <Input {...props} label="Last Name" type="text" />
                  ),
                }}
              />
              {errors.lastName && <span>{errors.lastName.message}</span>}
            </div>

            <div className={classes.inputContainer}>
              <Controller
                {...{
                  control,
                  register,
                  name: "email",
                  rules: {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Email is not in a right format.",
                    },
                  },
                  render: (props) => (
                    <Input {...props} label="Email" type="text" />
                  ),
                }}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>
        </div>

        <div className={classes.row2}>
          <div className={classes.inputContainer}>
            <input
              type="text"
              placeholder=" Search store by code."
              // label="Assign a Store"
              // labelSize="large"
              value={enteredSearchValue}
              onChange={searchValueChangeHandler}
            ></input>
          </div>
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
