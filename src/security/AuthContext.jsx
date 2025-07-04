import { createContext, useContext, useEffect, useState } from "react";
import {
  addUserTodoListRequest,
  createUser,
  getUserTodoListByUsernameRequest,
  getTodoByUserIdAndIsDeletedFalse,
  loginRequest,
  updateUserTodoListById,
} from "../api/axios"; // Import the Axios instance
// import axios from "axios";

// 1.CREATE A CONTEXT
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 2.SHARE THE CREATED CONTEXT WITH OTHER COMPONENTS
export default function AuthProvider({ children }) {
  // 3.PUT SOME STATE IN THE CONTEXT
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState([]);

  const [responseStatus, setResponseStatus] = useState("");
  const [responseData, setResponseData] = useState("");
  const [responseError, setResponseError] = useState("");
  const [userTodoList, setUserTodoList] = useState([]);

  const [isLoading, setLoading] = useState(false);

  // USER REGISTRATION
  async function userRegistration(username, password, cpassword) {
    // console.log("Checking password.");
    // console.log("user input:" + username + password + cpassword); // This line is commented out but good for debugging if needed.

    if (cpassword === password) {
      // console.log("Password confirmed.");

      const rest = await createUser({ username, password });
      // const res = await api.post("/users/register", {
      //   username,
      //   password,
      // });

      // --- Corrected/Improved Section ---
      setResponseStatus(res.status); // Assuming this is a state setter
      setResponseData(res.data); // Assuming setResponseData expects an object, or adjust if string is needed
      setResponseError(""); // Clear previous errors

      console.log("API response:", res); // Better way to log the full response

      return responseData;
    }
  }

  //  LOGIN AUTHENTICATION (now using Axios)
  async function login(username, password) {
    try {
      const response = await loginRequest(username, password);

      // Use response directly for immediate logic
      const loginMessage = response?.data?.value;

      // console.log("Login Response: " + loginMessage);
      if (loginMessage === "Login successful.") {
        setAuthenticated(true);
        setUserAuthenticated(response.data);
        console.log("login cred:", response.data);
        return true;
      }
      return false;
    } catch (error) {
      setResponseError(error);
      console.log("Error:", error);
      return false;
    }
  }

  //  LOGOUT AUTHENTICATION
  function logout() {
    setAuthenticated(false);
    setUserAuthenticated(null);
    // Optionally call API logout endpoint here
  }

  // LOAD USER TODO LIST
  async function loadUserTodoList() {
    console.log("userData:", userAuthenticated);
    const user = userAuthenticated.data.username;
    const userId = userAuthenticated.data.id;
    console.log("userId:", userId);
    try {
      setLoading(true);
      // const response = await getUserTodoListByUsernameRequest(user);
      const response = await getTodoByUserIdAndIsDeletedFalse(userId);

      setResponseData(response.data);
      setUserTodoList(response.data);

      const todoListData = response?.data;

      console.log("Todo: ", todoListData);
    } catch (error) {
      setResponseError(error);
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }

  // ADD USER TODO LIST
  async function addUserTodoList(userTodo) {
    try {
      const response = await addUserTodoListRequest(userTodo);
      console.log("Response from API:", response);
      const responseMessage = response?.data?.value;
      console.log("Response value: ", responseMessage);
      if (responseMessage === "Success") {
        console.log("return: true");
        return true;
      }
      console.log("return: false");
      return false;
    } catch (error) {
      setResponseError(error);
      console.log("Error:", error);
    }
  }

  // UPDATE USER TODO LIST
  async function updateUserTodoList(id, userTodo) {
    try {
      const response = await updateUserTodoListById(id, userTodo);
      const responseMessage = response?.data?.value;
      console.log("Response from API:", responseMessage);

      return true;
    } catch (error) {
      setResponseError(error);
      console.log("Error:", error);
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userAuthenticated,
        login,
        logout,
        userRegistration,
        loadUserTodoList,
        userTodoList,
        addUserTodoList,
        updateUserTodoList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
