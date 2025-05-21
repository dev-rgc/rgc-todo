import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <h1>TodoApp Management</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route
            path="/welcome/:username"
            element={<WelcomeComponent />}
          ></Route>
          <Route path="*" element={<ErrorComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
