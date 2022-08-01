import axiosClient from "./axiosClient";

const sizeApi = {
  getById(id) {
    const url = `/public/sizes/${id}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = `/public/sizes`;
    return axiosClient.get(url);
  },
};

export default sizeApi;
