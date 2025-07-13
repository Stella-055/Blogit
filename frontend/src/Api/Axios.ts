import axios from "axios";

const api = axios.create({
  baseURL: "https://blogit-u0y3.onrender.com",
  withCredentials: true,
});

export default api;
