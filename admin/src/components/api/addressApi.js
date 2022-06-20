import axiosClient from './axiosClient';

const addressApi = {
  getAllAddressByUser(id) {
    const url = `/admin/address/${id}`;
    return axiosClient.get(url);
  },
};
export default addressApi;
