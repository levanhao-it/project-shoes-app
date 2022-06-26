import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = Cookies.get('access_token');
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

    const URLS = ['/admin/login'];
    if (URLS.includes(config.url) && status === 400) {
      throw new Error(data.message);
    }

    if (status === 404) {
      throw new Error(data.message);
    }

    // handle 401 error
    if (status === 401 && !refresh) {
      refresh = true;
      console.log(refresh);
      (async () => {
        try {
          const response = await axiosClient.get('http://localhost:8080/api/token/refresh');
          console.log(response);
          if (response.status === 403) {
            console.log(response);

            Cookies.set('access_token', response.data.access_token, { expires: 7, path: '/' });
            axiosClient.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.data.access_token}`;
            console.log('token', Cookies.get('access_token'));
            return axiosClient(error);
          }
        } catch (error) {}
      })();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
