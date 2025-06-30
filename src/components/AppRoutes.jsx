import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import LoginComponent from "./LoginComponent";
import Home from "./Home";
import TodoComponent from "./TodoComponent";
import ErrorComponent from "./ErrorComponent";
import { useAuth } from "../security/AuthContext";
import Registration from "./UserRegistration";
import TodoDetailsComponent from "./TodoDetailsComponent";

function AppRoutes() {
  const isAuthenticated = useAuth().isAuthenticated;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={isAuthenticated ? <Home /> : <LoginComponent />}
        />
        {/* <Route path="/home/:username" element={<Home />}></Route> */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/todos"
          element={isAuthenticated ? <TodoComponent /> : <Navigate to="/" />}
        />
        <Route
          path="/todo"
          element={
            isAuthenticated ? <TodoDetailsComponent /> : <Navigate to="/" />
          }
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Registration /> : <Navigate to="/" />}
        />
      </Route>
      <Route path="*" element={<ErrorComponent />}></Route>
    </Routes>
  );
}

export default AppRoutes;
