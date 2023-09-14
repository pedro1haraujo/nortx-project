import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use((response) => response, (error) => {
  if (error.message === 'Network Error') {
    error = {
      response: {
        status: 500,
        data: {
          message: 'Ops! Parece que os nossos serviços estão fora do ar. Tente novamente mais tarde.'
        }
      }
    }
  }
  if (error && error.response && error.response.status === 401 && window.location.pathname !== '/login') {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data)
  }
  return Promise.reject(error)
})

export default api

