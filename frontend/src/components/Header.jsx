import { useNavigate } from "react-router-dom";
import { Logout } from "../api/login";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await Logout();

    if (res.status === 200) {
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  return (
    <header className="flex items-center justify-around w-full h-[80px] bg-[#191919]">
      <h1 className="text-3xl font-bold text-center">
        News Subscription Manager
      </h1>
      {isAuthenticated && <button onClick={handleLogout}>Cerrar Sesion</button>}
    </header>
  );
};

export default Header;
