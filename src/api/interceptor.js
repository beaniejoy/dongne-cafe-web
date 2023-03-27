import axios from 'axios'
import CookiesUtils from '@/utils/CookiesUtils'

function setInterceptors(instance) {
  instance.interceptors.request.use(config => {
    console.log('axios request', config)
    config.headers['Authorization'] = `Bearer ${CookiesUtils.getCookie(process.env.VUE_APP_ACCESS_TOKEN_COOKIE)}`
    return config
  })

  instance.interceptors.response.use(response => {
    console.log('axios response', response)
    return response.data
  }, error => {
    console.log('axios api error:', error)
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

export let axiosInstance = createAxiosInstance()