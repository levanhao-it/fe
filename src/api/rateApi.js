import axiosClient from './axiosClient';

const rateApi = {
  getById(id) {
    const url = `public/rate/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/rate';
    return axiosClient.post(url, data);
  },
};

export default rateApi;
