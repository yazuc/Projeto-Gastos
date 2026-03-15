import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5084/api"
});
