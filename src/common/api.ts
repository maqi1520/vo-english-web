import axios, { AxiosResponse } from 'axios';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

export const register = (data) => {
  return request.post('/api/auth/register', data).then((res) => res.data);
};

export const login = (data) => {
  return request
    .post<{ token: string }>('/api/auth/login', data)
    .then((res) => res.data);
};

export const updateVideo = (id, data) => {
  return request.put(`/api/videos/${id}`, data).then((res) => res.data);
};

export const createVideo = (data) => {
  return request.post(`/api/videos`, data).then((res) => res.data);
};

export default request;
