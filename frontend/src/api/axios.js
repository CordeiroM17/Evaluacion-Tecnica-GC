import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000`, // API_URL enviroment
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const PostLogin = async (email, password) => {
  return await api.post("/login", { email, password });
};

export const Logout = () => {
  api.post("/login/logout").then((res) => {
    console.log(res);
  });
};

export const PostSubscription = () => {
  api.post("/subscription").then((res) => {
    console.log(res);
  });
};
export const GetAllSubscriptionByPhoneNumber = (phoneNumber) => {
  api.get(`/subscription/${phoneNumber}`).then((res) => {
    console.log(res);
  });
};
