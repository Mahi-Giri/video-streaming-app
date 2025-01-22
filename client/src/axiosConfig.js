import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4444",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
