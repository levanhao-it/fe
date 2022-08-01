import axiosClient from "./axiosClient";

const colorApi = {
  getById(id) {
    const url = `/public/colors/${id}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = `/public/colors`;
    return axiosClient.get(url);
  },
};

export default colorApi;
