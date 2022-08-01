import axiosClient from "./axiosClient";

const voucherApi = {
  getAll() {
    const url = "/vouchers/list";
    return axiosClient.get(url);
  },
};

export default voucherApi;
