import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/register';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '/login';
    return axiosClient.post(url, data);
  },
  logout() {
    const url = '/logout';
    return axiosClient.get(url);
  },
  getUser() {
    const url = '/user';
    return axiosClient.get(url);
  },
  update(data) {
    const url = '/user';
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  verify(data) {
    const url = `/verify`;
    return axiosClient.post(url, null, {
      params: data,
    });
  },

  forgotPassword(data) {
    const url = `/forgot-password`;
    return axiosClient.post(url, data);
  },

  changePassword(data) {
    const url = `/change-password`;
    return axiosClient.post(url, data);
  },

  remove(params) {
    const url = '/user';
    return axiosClient.delete(url, { params });
  },
};
export default userApi;
