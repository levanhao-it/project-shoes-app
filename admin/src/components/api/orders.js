import axiosClient from './axiosClient';

const ordersApi = {
  getAllOrderByUser(id) {
    const url = `/admin/orders/${id}`;
    return axiosClient.get(url);
  },
};
export default ordersApi;
