import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username: " + username + " Password: " + password);

    const loginStatus = await authContext.login(username, password);
    console.log("loginStatus: " + loginStatus);

    loginStatus ? navigate("/home") : setErrorMessage(true);
  };

  return (
    <div className="container max-w-xs flex justify-center items-center">
      <form>
        {showErrorMessage && (
          <div className="authenticationMessage text-red-400">
            Authentication Failed. Please check your credentials.
          </div>
        )}

        {/* INPUT FIELDS */}
        <div>
          {/* USERNAME FIELD */}
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              Username :
            </div>
            <input
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              id="username"
              type="text"
              name="username"
              value={username}
              // placeholder="janesmith"
              onChange={handleUsernameChange}
            />
          </div>

          {/* PASSWORD FIELD */}
          <div className="mt-3 flex items-center  rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              Password :
            </div>
            <input
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center">
          {/* SHOW PASSWORD */}
          <button
            className="w-5 h-5  mr-2"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
          <p className="text-xs">Show password</p>
        </div>

        {/* BUTTONS */}
        <div className="mt-3 flex items-center justify-around">
          {/* LOGIN BUTTON */}
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Login
          </button>

          {/* REGISTER BUTTON */}
          <Link to={"/register"} className="text-sm/6 font-semibold">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
