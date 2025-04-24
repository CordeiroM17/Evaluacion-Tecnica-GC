import { Logout } from "../api/axios";

const Header = () => {
  return (
    <header className="flex items-center justify-around w-full h-[80px] bg-[#191919]">
      <h1>HEADER TITLE</h1>
      <button onClick={Logout}>Cerrar Sesion</button>
    </header>
  );
};

export default Header;
