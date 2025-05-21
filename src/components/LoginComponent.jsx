import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setSuccessMessage] = useState(false);
  const [showErrorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (username === "rgcdev" && password === "rgcpassword") {
      setSuccessMessage(true);
      setErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else {
      setSuccessMessage(false);
      setErrorMessage(true);
    }
  };

  return (
    <div className="LoginPage">
      {showSuccessMessage && (
        <div className="authenticationMessage">Authenticated Successfully.</div>
      )}

      {showErrorMessage && (
        <div className="authenticationMessage">
          Authentication Failed. Please check your credentials.
        </div>
      )}

      <div className="LoginForm">
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" name="btnLogin" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
