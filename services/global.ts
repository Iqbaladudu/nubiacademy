import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_ENDPOINT,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export const local = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_ENDPOINT,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
