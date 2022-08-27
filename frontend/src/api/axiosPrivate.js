import axios from "axios";
import StorageKeys from "constant/storage-keys";

import axiosClient from "./axiosClient";

const baseURL = "https://app-shoes-nlu.herokuapp.com/";

const axiosPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  async function (error) {
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);
      window.location.pathname = "/";
      await axiosClient.get("/logout");
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
