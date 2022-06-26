import axiosClient from './axiosClient';

const ordersApi = {
  getAllOrderByUser(id) {
    const url = `/public/orders/${id}`;
    return axiosClient.get(url);
  },
};
export default ordersApi;
