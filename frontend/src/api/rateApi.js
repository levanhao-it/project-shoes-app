import axiosClient from './axiosClient';

const rateApi = {
  getById(id) {
    const url = `public/rate/${id}`;
    return axiosClient.get(url);
  },
};

export default rateApi;
