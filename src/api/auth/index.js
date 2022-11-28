import { createAxiosInstance } from '@/api';

export function authenticateApi(requestData) {
  return createAxiosInstance().post('/auth/authenticate', requestData);
}