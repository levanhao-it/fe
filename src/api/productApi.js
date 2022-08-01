import axiosClient from "./axiosClient";

const productApi = {
  getById(id) {
    const url = `public/products/${id}`;
    return axiosClient.get(url);
  },
  getAll(params) {
    const url = `public/products`;
    return axiosClient.get(url, { params });
  },
};

export default productApi;
