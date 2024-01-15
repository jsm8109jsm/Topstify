import axios from "axios";

const instance = axios.create({
  baseURL: `/api`,
  withCredentials: true,
  timeout: 60000,
});

export default instance;
