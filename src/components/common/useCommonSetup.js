import { reactive } from 'vue'
import { ApiBusinessError } from '@/api/error/ApiBusinessError'

export default function useCommonSetup() {
  const error = reactive({    
    message: '',
    default: '일시적인 오류가 발생했습니다.'
  })

  const handleError = (apiError) => {
    console.error(apiError)

    const message = apiError instanceof ApiBusinessError ? apiError.message : error.default

    alert(message)
    error.message = message
  }

  return {
    handleError
  }
}