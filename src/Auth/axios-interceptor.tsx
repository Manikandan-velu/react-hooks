import axios, { AxiosInstance } from 'axios';
//import { getBasePath, Storage } from 'react-jhipster';

import { SERVER_API_URL } from '../Constants/Constant';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = (onUnauthenticated: any) => {
    console.log('axios', axios)
  const onRequestSuccess = (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response:any) => response;
  const onResponseError = (err:any) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
  console.log('axios', axios)
};

export default setupAxiosInterceptors;
