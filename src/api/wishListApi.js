import axiosClient from "./axiosClient";

const wishListApi = {
  getAll(params) {
    const url = "/wishList";
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = "/wishList";
    return axiosClient.post(url, data);
  },
  remove(id, params) {
    const url = `/wishList/${id}`;
    return axiosClient.delete(url, { params });
  },
};

export default wishListApi;
