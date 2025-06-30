import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../security/AuthContext";

function UserRegistration() {
  const authContext = useAuth();

  // USER OBJECT
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  console.log(user);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = (e) => {
    const name = e.currentTarget.name;

    setShowPassword({
      [name]: !showPassword[name],
    });
  };

  const handleRegister = async (e) => {
    // console.log("trigger registration");
    const result = await authContext.userRegistration(
      user.username,
      user.password,
      user.confirmPassword
    );

    console.log("Registration result: ", result);
  };

  const navigate = useNavigate();

  return (
    <div className="container flex items-center justify-center text-sm">
      <div className="">
        {/* ERROR MESSAGES */}
        <div className="authenticationMessage text-red-400 mb-2">
          Username already exist. Password not matched.
        </div>

        <form className="flex flex-col gap-3">
          {/* USERNAME */}
          <label
            className="outline-1  outline-gray-400 rounded-md px-3 focus-within:outline-2  focus-within:outline-blue-600 
          flex items-center"
          >
            Username :
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="grow focus-within:outline-0 px-2 py-1.5"
            />
          </label>

          {/* PASSWORD */}
          <label
            className="outline-1  outline-gray-400 rounded-md px-3 focus-within:outline-2  focus-within:outline-blue-600
          flex items-center"
          >
            Password :
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              className="grow focus-within:outline-0 px-2 py-1.5"
            />
            <button
              id="password"
              name="password"
              className="w-5 h-5 "
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword.password ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </label>

          {/* CONFIRM PASSWORD */}
          <label
            className="outline-1  outline-gray-400 rounded-md px-3 focus-within:outline-2  focus-within:outline-blue-600 
          flex items-center"
          >
            Confirm Password :
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="grow focus-within:outline-0 pl-2 py-1.5"
            />
            <button
              id="confirmPassword"
              name="confirmPassword"
              className="w-5 h-5 "
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword.confirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </label>

          <div className="flex mt-4 text-white">
            <button
              type="button"
              className="mx-2 grow bg-blue-600 rounded-lg p-1"
              onClick={handleRegister}
            >
              Save
            </button>
            <button
              type="button"
              className="mx-2 grow bg-blue-600 rounded-lg py-1"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
