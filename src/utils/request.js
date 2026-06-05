import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// 响应拦截器：统一提取 data
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('请求异常:', error.message)
    }
    return Promise.reject(error)
  }
)

export default request
