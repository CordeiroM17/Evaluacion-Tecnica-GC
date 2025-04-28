import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostLogin } from "../api/login";
import { useAuth } from "../context/AuthProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    // Do some Validations or something

    const res = await PostLogin(email, password);

    if (res.status === 200) {
      setIsAuthenticated(true);
      navigate("/home");
    }
  };

  return (
    <div className="rounded-lg border">
      <div className="p-6 text-white">
        <h2 className="text-2xl font-semibold">Account Login</h2>
        <p className="mt-2 opacity-90">
          Access your personalized news feed and subscription preferences
        </p>
      </div>

      <form onSubmit={handleSumbit} className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              className="w-full px-4 py-3 border rounded-md"
              type="email"
              id="email"
              placeholder="your.email@example.com"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              className="w-full px-4 py-3 border rounded-md"
              type="password"
              id="password"
              placeholder="*********"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
