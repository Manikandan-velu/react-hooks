import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { SERVER_API_URL } from '../Constants/Constant';
import { ILogin, IHorse_Response, IHorse } from '../../src/Interface/interface';

const onRequestSuccess = (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token && !config.url.includes('login')) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('axios', config)
    return config;
};
const onResponseSuccess = (response:any) => {
    response = response.data;
    return response;
};
const onResponseError = (err:any) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
    }
    console.log('axios err', err)
    return Promise.reject(err);
};

axios.interceptors.request.use(onRequestSuccess);
axios.interceptors.response.use(onResponseSuccess, onResponseError);

// API Callls Start here

export const login = (data: ILogin)=> {
    return axios.post(`${SERVER_API_URL}/v1/users/login`, data);
}

export const logout = ()=> {
    localStorage.removeItem('access_token');
}

export const getHorses = ()=> {
    return axios.get(`${SERVER_API_URL}/v1/horses`)
}

export const addHorse = (param:any)=> {
    return axios.post(`${SERVER_API_URL}/v1/horses`, param)
}

export const updateHorse = (param:any)=> {
    return axios.put(`${SERVER_API_URL}/v1/horses/${param.id}`, param)
}

export const deleteHorse = (param:any)=> {
    return axios.delete(`${SERVER_API_URL}/v1/horses/${param}`, {})
}

export const signUp = (param:any)=> {
    return axios.post(`${SERVER_API_URL}/v1/users/register`, param)
}