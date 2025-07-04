import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import { findTodoById, findTodoByIdAndUpdate } from "../utils/todos";
import { format, formatDate } from "date-fns";
import {
  DocumentPlusIcon,
  DocumentTextIcon,
  DocumentMinusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { updateUserTodoListById } from "../api/axios";

function TodoComponent() {
  const navigate = useNavigate();
  const authContext = useAuth(); // CONTEXT PROVIDER
  // console.log("AuthContext: ", authContext);
  const todos = authContext.userTodoList; // USER TODOS
  // console.log("UserTodos: ", todos);

  useEffect(() => {
    authContext.loadUserTodoList();
  }, []);

  const handleEdit = (id) => {
    // e.preventDefault();
    navigate(`/todo?id=${id}`);
  };

  const handleCheck = async (e) => {
    const val = e.target.checked;
    const checkBoxTodoId = Number(e.target.id);

    console.log("Checkbox changed:", checkBoxTodoId, val);

    const mappedTodo = findTodoByIdAndUpdate(todos, checkBoxTodoId, {
      isDone: val,
    });

    console.log("mapped:", mappedTodo);
    if (!mappedTodo) {
      console.warn("No todo found for checkbox:", checkBoxTodoId);
      return;
    }

    try {
      const result = await updateUserTodoListById(checkBoxTodoId, mappedTodo);
      console.log(result);
      // Adjust this check based on what your API returns
      if (result?.data?.value === "Todo updated successfully.") {
        authContext.loadUserTodoList();
      } else {
        console.warn("Unexpected response:", result);
        setErrorMessage(true);
      }
    } catch (error) {
      console.error("Failed to update user todo isDone:", error);
      setErrorMessage(true);
    }
  };

  const handleDelete = async (e) => {
    const todoId = e.currentTarget.id;
    const val = e.currentTarget.value;
    // const isDeleted = e.target.value === "true"; // → boolean

    console.log("todoId:" + todoId + " value:" + val);

    const mappedTodo = findTodoByIdAndUpdate(todos, todoId, {
      isDeleted: val === "true",
    });

    console.log("mapped:", mappedTodo);

    try {
      const result = await updateUserTodoListById(todoId, mappedTodo);
      console.log(result);
      // Adjust this check based on what your API returns
      if (result?.data?.value === "Todo updated successfully.") {
        authContext.loadUserTodoList();
      } else {
        console.warn("Unexpected response:", result);
        setErrorMessage(true);
      }
    } catch (error) {
      console.error("Failed to update user todo isDeleted:", error);
      setErrorMessage(true);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-row justify-end mb-1">
        <button className="w-6 h-6" onClick={() => navigate("/todo")}>
          <DocumentPlusIcon />
        </button>
      </div>
      <div>
        <table className="min-w-full table-auto border-b-1 border-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left border-b">ID</th>
              <th className="px-4 py-2 text-left border-b">Description</th>
              <th className="px-4 py-2 text-left border-b">is Done</th>
              <th className="px-4 py-2 text-left border-b">Target Date</th>
              <th className="px-4 py-2 text-left border-b">UserId</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {todos.map((element) => (
              <tr
                key={element.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 border-b">{element.id}</td>
                <td className="px-4 py-2 border-b">{element.description}</td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    id={element.id}
                    name="checkbox"
                    checked={
                      element.isDone === true || element.isDone === "true"
                    }
                    onChange={handleCheck}
                    // disabled
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 disabled:cursor-default"
                  />
                </td>
                <td className="px-4 py-2 border-b">{element.targetDate}</td>
                <td className="px-4 py-2 border-b">{element.user.id}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="w-6 h-6"
                    onClick={() => {
                      handleEdit(element.id);
                    }}
                  >
                    <PencilSquareIcon />{" "}
                  </button>
                  <button
                    className="w-6 h-6"
                    id={element.id}
                    value="true"
                    onClick={handleDelete}
                  >
                    <DocumentMinusIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoComponent;
