import axios from "axios";

export const instance = axios.create({
  baseURL: `https://backend.nubiacademy.id/api`,
  headers: {
    Accept: "application/json",
  },
});
