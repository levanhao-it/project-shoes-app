import axiosClient from './axiosClient';

const productApi = {
  getById(id) {
    const url = `public/products/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
