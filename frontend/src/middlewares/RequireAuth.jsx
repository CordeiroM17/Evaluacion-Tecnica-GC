import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isAuthenticated = document.cookie.includes("token");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
