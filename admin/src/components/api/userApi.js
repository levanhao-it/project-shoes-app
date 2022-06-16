import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = '/admin/login';
    return axiosClient.post(url, data);
  },
};
export default userApi;
