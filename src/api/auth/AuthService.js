import { axiosInstance } from '@/api/interceptor'

class AuthService {
  authenticateApi(requestData) {
    return axiosInstance.post('/auth/authenticate', requestData)
  }

  async checkAuthenticated() {
    const response = await axiosInstance.get('/auth/check')

    return response?.result === 'SUCCESS'
  }
}

export const authService = new AuthService()