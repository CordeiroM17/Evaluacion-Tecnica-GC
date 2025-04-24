import { useState } from "react";
import { PostLogin } from "../api/axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    // Do some Validations or something

    const res = await PostLogin(email, password);

    if (res.status === 200) {
      navigate("/home");
    }
  };

  return (
    <form
      onSubmit={handleSumbit}
      className="bg-[#191919] w-[500px] flex flex-col items-center mt-10 text-white"
    >
      <h2>Login</h2>
      <div className="w-90 h-[80px] flex flex-col justify-center items-center">
        <label className="self-start" htmlFor="email">
          Email:
        </label>
        <input
          className="w-full bg-white text-black"
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-90 h-[80px] flex flex-col justify-center items-center">
        <label className="self-start" htmlFor="password">
          Password:
        </label>
        <input
          className="w-full bg-white text-black"
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full h-[80px]">
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
