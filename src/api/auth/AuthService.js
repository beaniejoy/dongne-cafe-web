import { axiosInstance } from '@/api/interceptor'

class AuthService {
  authenticateApi(requestData) {
    return axiosInstance.post('/auth/authenticate', requestData)
  }

  async checkAuthenticated() {
    const data = await axiosInstance.get('/auth/check')

    return data?.result === 'SUCCESS'
  }

  joinMemberApi(requestData) {
    return axiosInstance.post('/auth/members/join', requestData)
  }

  renewAuthToken() {
    return axiosInstance.post('/auth/token/renew')
  }

  logout() {
    return axiosInstance.post('/auth/logout')
  }
}

export const authService = new AuthService()