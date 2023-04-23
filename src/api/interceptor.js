import axios from 'axios'
import CookiesUtils from '@/utils/CookiesUtils'
import { ApiBusinessError } from '@/api/error/ApiBusinessError'

function setInterceptors(instance) {
  instance.interceptors.request.use(config => {
    console.log('#### axios request', config)
    config.headers['Authorization'] = `Bearer ${CookiesUtils.getCookie(process.env.VUE_APP_ACCESS_TOKEN_COOKIE)}`
    return config
  })

  instance.interceptors.response.use(response => {
    console.log('#### axios response', response)
    const data = response.data

    if (data.result === 'FAIL') {
      // Predictable Business Exception Handling
      return Promise.reject(new ApiBusinessError(data.errorCode, data.errorCode))
    }

    return data
  }, error => {
    console.error('#### axios error:', error)

    return Promise.reject(error)
  })

  return instance
}

function createAxiosInstance() {
  console.log('createAxiosInstance')
  const instance = axios.create({
    timeout: 3000
  })

  return setInterceptors(instance)
}

export const axiosInstance = createAxiosInstance()