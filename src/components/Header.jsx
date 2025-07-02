import React from "react";
import LogoutComponent from "./LogoutComponent";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
function Header() {
  const authContext = useAuth();

  // console.log("Header: ", authContext);

  return (
    <header>
      <div className="container py-2 px-4 flex items-center border-b-2 border-[#596575]">
        <div className="flex grow items-center justify-between">
          <Link to={"/home"} className="mr-3">
            Home
          </Link>

          {authContext.isAuthenticated && (
            <>
              <Link to="/todos">Todo</Link>
              <div className="grow justify-items-end mr-3">
                <LogoutComponent />
              </div>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
