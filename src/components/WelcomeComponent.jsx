import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function WelcomeComponent() {
  // const params = useParams();
  // console.log(params.username);
  const { username } = useParams();
  console.log(username);

  const navigate = useNavigate();

  return (
    <div className="WelcomePage">
      <h3>Welcome {username}</h3>
      <div>
        <button type="button" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default WelcomeComponent;
