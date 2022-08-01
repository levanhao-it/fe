import axiosClient from "./axiosClient";

const orderApi = {
  getAll(params) {
    const url = "/orders";
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = "/orders";
    return axiosClient.post(url, data);
  },
  getById(id) {
    const url = `orders/${id}`;
    return axiosClient.get(url);
  },
};

export default orderApi;
