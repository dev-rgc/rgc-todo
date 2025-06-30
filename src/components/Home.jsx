import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function Home() {
  // const params = useParams();
  // console.log(params.username);

  const authContext = useAuth();
  const username =
    authContext?.userAuthenticated?.data?.username ?? "Intruder!";

  return (
    <div className="container border-2 border-dashed border-white">
      <div>
        <h3>Welcome {username}</h3>
      </div>
    </div>
  );
}

export default Home;
