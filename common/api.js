import axios from 'axios'

const request = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    console.log(config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error.response.data)
  }
)

export const register = (data) => {
  return request.post('/api/auth/register', data)
}

export const login = (data) => {
  return request.post('/api/auth/login', data)
}

export default request
