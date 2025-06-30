import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function LogoutComponent() {
  const authContext = useAuth();

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <div className="logoutComponent">
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
}

export default LogoutComponent;
