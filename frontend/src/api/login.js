import { api } from "./axios";

export const PostLogin = async (email, password) => {
  return await api.post("/login", { email, password });
};

export const Logout = async () => {
  return await api.post("/login/logout");
};

export const VerifyToken = async () => {
  return await api.get("/login/verifyToken");
};
