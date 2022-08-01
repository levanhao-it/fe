import axiosClient from "./axiosClient";

const categoryApi = {
  getById(id) {
    const url = `public/categories/${id}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = `public/categories`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
