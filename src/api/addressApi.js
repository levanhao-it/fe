import axiosClient from "./axiosClient";

const addressApi = {
  getAll(params) {
    const url = "/address";
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = "/address";
    return axiosClient.post(url, data);
  },
  remove(id) {
    const url = `/address/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/address/${id}`;
    return axiosClient.put(url, data);
  },
};

export default addressApi;
