import axios from "axios";

console.log("aaaaaaaaaaa", import.meta.env.VITE_URL_API)
const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_API
});

export default instance;