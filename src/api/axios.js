/**
 * /src/api/axios.js
 * Reusable Axios instance for API calls.
 */
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Change to your API base URL
  // withCredentials: true,
  // You can add headers or interceptors here if needed
});

// CREATE USER
export const createUser = (user) => apiClient.post("/users/register", user);

// LOGIN REQUEST
export const loginRequest = (username, password) =>
  apiClient.post("/users/login", { username, password });

// GET USER TODO LIST
export const getUserTodoListByUsernameRequest = (username) =>
  apiClient.get("/todos/", {
    params: { username },
  });

// CREATE USER TODO LIST
export const addUserTodoListRequest = (userTodo) =>
  apiClient.post("/todos/", userTodo);

// DELETE USER TODO LIST
export const deleteUserTodoListById = (username) =>
  apiClient.get("/todos/", {
    params: { username },
  });

// EDIT USER TODO LIST
export const editUserTodoListById = (username) =>
  apiClient.get("/todos/", {
    params: { username },
  });
