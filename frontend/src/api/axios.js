import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`, // API_URL enviroment
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const PostLogin = async (email, password) => {
  return await api.post("/login", { email, password });
};

export const Logout = async () => {
  return await api.post("/login/logout");
};

export const PostSubscription = async (phoneNumber, categories) => {
  return await api.post("/subscriptions", { phone: phoneNumber, categories });
};

export const GetAllSubscriptionByPhoneNumber = async (phoneNumber) => {
  return await api.get(`/subscriptions/${phoneNumber}`);
};

export const GetAllCategories = async () => {
  return await api.get("/subscriptions/categories");
};
