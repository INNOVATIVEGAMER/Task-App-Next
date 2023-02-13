import axios from "axios";
const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

export const BE_ENDPOINT = axios.create({
  baseURL: BE_URL,
});
