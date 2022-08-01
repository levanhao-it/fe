import axios from 'axios';

import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import axiosPrivate from './axiosPrivate';
import StorageKeys from 'constant/storage-keys';

const axiosClient = axios.create({
  baseURL: 'https://app-shoes-nlu.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    if (
      config.url.indexOf('login') >= 0 ||
      config.url.indexOf('register') >= 0 ||
      config.url.indexOf('verify') >= 0 ||
      config.url.indexOf('token/refresh') >= 0 ||
      config.url.indexOf('logout') >= 0 ||
      config.url.indexOf('public/products') >= 0 ||
      config.url.indexOf('public/rate') >= 0 ||
      config.url.indexOf('public/categories') >= 0 ||
      config.url.indexOf('forgot-password') >= 0 ||
      config.url.indexOf('change-password') >= 0 ||
      config.url.indexOf('public/sizes') >= 0 ||
      config.url.indexOf('public/colors') >= 0
    ) {
      return config;
    }

    const token = localStorage.getItem(StorageKeys.TOKEN) || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const user = jwt_decode(token);

    const isExprired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExprired) return config;

    try {
      const response = await axiosPrivate.get('token/refresh');
      if (response.status === 200) {
        const newToken = response.data.data.accessToken;
        localStorage.setItem(StorageKeys.TOKEN, newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    } catch (error) {
      // console.log('loi');
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Do something with response error
    const { status, data } = error.response;
    if (status === 400 || status === 404) {
      throw new Error(data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
