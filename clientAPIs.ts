import axios from "axios";

const BE_URL = process.env.BE_URL;
const AUTH_TOKEN = localStorage.getItem("authToken");

export const BE_ENDPOINT = axios.create({
  baseURL: BE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});
