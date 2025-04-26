import { useNavigate } from "react-router-dom";
import { Logout } from "../api/login";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await Logout();

    if (res.status === 200) {
      navigate("/");
    }
  };

  return (
    <header className="flex items-center justify-around w-full h-[80px] bg-[#191919]">
      <h1>HEADER TITLE</h1>
      <button onClick={handleLogout}>Cerrar Sesion</button>
    </header>
  );
};

export default Header;
