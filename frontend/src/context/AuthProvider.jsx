import { createContext, useState, useEffect, useContext } from "react";
import { VerifyToken } from "../api/login";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname !== "/") {
      const verifyUserLogged = async () => {
        try {
          const res = await VerifyToken();

          if (res.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
      verifyUserLogged();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
