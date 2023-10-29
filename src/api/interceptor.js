import axios from 'axios'
import { ApiBusinessError } from '@/api/error/ApiBusinessError'
import { authToken } from '@/api/auth/AuthToken'
import { authService } from '@/api/auth/AuthService'

function setInterceptors(instance) {
  instance.interceptors.request.use(config => {
    console.log(`#### REQUEST [${config.method.toUpperCase()} ${config.url}]`, config)
    config.headers['Authorization'] = `Bearer ${authToken.accessToken}`
    return config
  })

  instance.interceptors.response.use(async (response) => {
    const { data, config } = response
    console.log(`#### RESPONSE [${config.method.toUpperCase()} ${config.url}]`, response)

    if (data.result === 'SUCCESS') {
      return data
    }

    try {
      // request again after renewing token
      const isRenew = await renewAuthTokenExpired(data.errorCode)
      if (isRenew) {
        return new Promise((resolve) => {
          resolve(instance(config))
        })
      }

      // Predictable Business Exception Handling
      return Promise.reject(new ApiBusinessError(data.errorCode, data.errorCode))
    } catch (e) {
      return Promise.reject(e)
    }
  }, error => {
    console.error('#### ERROR', error)
    return Promise.reject(error)
  })

  return instance
}

// check access token expired and renew
async function renewAuthTokenExpired(errorCode) {
  if (errorCode !== 'AUTH_TOKEN_EXPIRED') {
    return false
  }

  await authService.renewAuthToken()

  return true
}

function createAxiosInstance() {
  const instance = axios.create({
    timeout: 3000
  })

  return setInterceptors(instance)
}

export const axiosInstance = createAxiosInstance()