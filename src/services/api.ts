import axios from "axios";

const api = axios.create({
  baseURL: "https://link-curto.up.railway.app",
});

export default api;
