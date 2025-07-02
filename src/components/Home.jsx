import { useAuth } from "../security/AuthContext";

function Home() {
  const authContext = useAuth();
  const username =
    authContext?.userAuthenticated?.data?.username ?? "Intruder!";

  return (
    <div className="container">
      <div>
        <h3>Welcome {username}</h3>
      </div>
    </div>
  );
}

export default Home;
