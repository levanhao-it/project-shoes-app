import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
let refresh = false;
axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Do something with response error
    const { config, status, data } = error.response;
    console.log(data);
    const URLS = ["/register", "/login"];
    if (URLS.includes(config.url) && status === 400) {
      throw new Error(data.message);
    }

    // handle 403 error
    if (status === 403 && !refresh) {
      refresh = true;
      const token = Cookies.get("token");
      const data = {
        token,
      };
      return axiosClient
        .post("/token/refresh", data)
        .then((res) => {
          Cookies.set("token", res.data.token);
          refresh = false;
          config.headers.Authorization = `Bearer ${res.data.token}`;
          return axiosClient(config);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
