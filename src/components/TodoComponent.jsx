import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  DocumentPlusIcon,
  DocumentTextIcon,
  DocumentMinusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

function TodoComponent() {
  const navigate = useNavigate();
  // const todos = [
  //   { id: 1, description: "Learn HTML", isDone: false },
  //   { id: 2, description: "Learn CSS", isDone: false },
  //   { id: 3, description: "Learn JS", isDone: false },
  //   { id: 4, description: "Learn React", isDone: false },
  // ];

  const authContext = useAuth();
  console.log("AuthContext: ", authContext);
  const todos = authContext.userTodoList;
  // console.log("UserTodos: ", todo);
  // console.log("todoId: ", todo.id);

  useEffect(() => {
    authContext.loadUserTodoList();
  }, []);

  const goToTodo = () => {
    navigate("/todo");
  };

  const handleEdit = (id) => {
    // e.preventDefault();
    navigate(`/todo?id=${id}`);
  };

  return (
    <div className="container">
      <div className="flex flex-row justify-end mb-1">
        <button className="w-6 h-6" onClick={goToTodo}>
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
                  {element.isDone.toString()}
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
                  <button className="w-6 h-6" onClick={() => {}}>
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
