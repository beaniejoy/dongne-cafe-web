import { axiosInstance } from '@/api/interceptor'
import { authToken } from '@/api/auth/AuthToken'

class AuthService {
  authenticateApi(requestData) {
    return axiosInstance.post('/auth/authenticate', requestData)
  }

  joinMemberApi(requestData) {
    return axiosInstance.post('/auth/members/join', requestData)
  }

  async renewAuthToken() {
    const responseData = await axiosInstance.post('/auth/token/renew')
    authToken.updateAccessToken(responseData.data.accessToken)
  }

  logout() {
    return axiosInstance.post('/auth/logout')
  }
}

export const authService = new AuthService()