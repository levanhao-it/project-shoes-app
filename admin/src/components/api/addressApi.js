import axiosClient from './axiosClient';

const addressApi = {
  getAllAddressByUser(id) {
    const url = `/admin/address/`;
    return axiosClient.get(url, {
      params: {
        idUser: id,
      },
    });
  },
};
export default addressApi;
