import React from "react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { format, formatDate } from "date-fns";
import { useAuth } from "../security/AuthContext";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import { findTodoById } from "../utils/todos";

function TodoDetailsComponent() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const userAuthenticated = authContext.userAuthenticated;
  const userTodoList = authContext.userTodoList;
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id"); // ✅ returns id from url

  //   const [todoList, setTodoList] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // USER TODO OBJECT
  const [userTodo, setUserTodo] = useState({
    userId: "",
    username: "",
    description: "",
    isDone: false,
    dateCreated: format(new Date(), "yyyy-MM-dd"),
    targetDate: format(new Date(), "yyyy-MM-dd"),
  });

  useEffect(() => {
    if (!userAuthenticated?.data) return;

    if (id) {
      const todo = findTodoById(userTodoList, id);

      if (todo) {
        setEditMode(true);
        console.log("Edit mode:", true, "Editing Todo:", todo);

        setUserTodo((prev) => ({
          ...prev,
          userId: todo.user.id,
          username: todo.user.username,
          description: todo.description,
          isDone: todo.isDone,
          dateCreated: todo.dateCreated,
          targetDate: todo.targetDate,
        }));
      } else {
        console.warn("Todo not found with ID:", id);
      }
    } else {
      setEditMode(false);
      console.log(
        "Edit Mode:",
        false,
        "Creating new todo for:",
        `${userAuthenticated.data.username} (ID: ${userAuthenticated.data.id})`
      );

      setUserTodo((prev) => ({
        ...prev,
        userId: userAuthenticated.data.id,
        username: userAuthenticated.data.username,
      }));
    }
  }, [id, userTodoList, userAuthenticated]);

  const handleChange = (e) => {
    setUserTodo({
      ...userTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let result;

    try {
      if (editMode) {
        console.log("To be updated user todo:", userTodo);
        result = await authContext.updateUserTodoList(id, userTodo);
        console.log("Updating user todo result: ", result);
      } else {
        console.log("To be added user todo:", userTodo);
        result = await authContext.addUserTodoList(userTodo);
        console.log("Adding user todo result: ", result);
      }

      if (result === true) {
        authContext.loadUserTodoList();
        navigate("/todos");
      }
    } catch (error) {
      console.error("Failed to save user todo:", error);
      setErrorMessage(true);
    }
  };

  const handleCancel = () => {
    navigate("/todos");
  };

  return (
    <div className="container flex justify-center  item-center">
      <div className="max-w-sm w-full ">
        {/* HEADING */}
        <div>
          <h4 className="text-center">Todo Details</h4>
        </div>

        {/*  INPUT FIELDS */}
        <div className="mt-2 flex flex-col gap-y-3">
          {/*  DESCRIPTION FIELD */}
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              Description :
            </div>
            <input
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              id="description"
              type="text"
              name="description"
              value={userTodo.description}
              onChange={handleChange}
            />
          </div>

          {/*  DATE FIELD */}
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              Target Date :
            </div>

            {/* DATE SELECTED */}
            <input
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              id="targetDate"
              type="text"
              name="targetDate"
              value={userTodo.targetDate}
              readOnly
            />

            {/* TOGGLE FOR CALENDAR VISIBILITY */}
            <div className="w-5 h-5 text-gray-900 mr-3">
              <button
                type="button"
                onClick={() => setShowCalendar((prev) => !prev)}
                className="w-full h-full flex items-center justify-center"
                aria-label={showCalendar ? "Close calendar" : "Open calendar"}
              >
                {showCalendar ? <XMarkIcon /> : <CalendarIcon />}
              </button>
            </div>

            {/* CALENDAR */}
          </div>
          <div className="flex justify-center">
            {!showCalendar ? null : (
              <Calendar
                onChange={(date) => {
                  setUserTodo((prev) => ({
                    ...prev,
                    targetDate: format(date, "yyyy-MM-dd"),
                  }));
                  setShowCalendar(false);
                }}
                value={userTodo.targetDate}
                className="text-gray-900"
              />
            )}
          </div>

          <div className="flex justify-center  gap-x-2">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSave}
            >
              SAVE
            </button>

            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCancel}
            >
              CANCEL
            </button>
          </div>
        </div>

        <div className="text-color-red-500">
          {errorMessage ? <h3>Failed to Save Data</h3> : null}
        </div>
      </div>
    </div>
  );
}

export default TodoDetailsComponent;
