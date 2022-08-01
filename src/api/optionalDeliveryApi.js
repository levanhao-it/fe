import axiosClient from "./axiosClient";

const optionalDeliveryApi = {
  getAll() {
    const url = "/delivery";
    return axiosClient.get(url);
  },

  add(data) {
    const url = "/delivery";
    return axiosClient.post(url, data);
  },
  remove(id) {
    const url = `/delivery/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/delivery/${id}`;
    return axiosClient.put(url, data);
  },
};

export default optionalDeliveryApi;
