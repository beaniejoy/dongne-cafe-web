import { axiosInstance } from '@/api/interceptor'
import { UrlBuilder } from '@/utils/UrlBuilder'

class CafeService {
  searchCafesApi(name) {
    return axiosInstance.get(UrlBuilder.createPathWithParams('/api/cafes', { name }))
  }
}

export const cafeService = new CafeService()