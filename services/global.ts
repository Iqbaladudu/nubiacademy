"use server"

import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.ENDPOINT,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});