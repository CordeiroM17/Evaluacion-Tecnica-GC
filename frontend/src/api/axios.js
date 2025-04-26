import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:3000`, // API_URL enviroment
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
