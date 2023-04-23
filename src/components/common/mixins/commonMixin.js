import { ApiBusinessError } from '@/api/error/ApiBusinessError'

export default {
  data() {
    return {
      error: {
        message: '',
        default: '일시적인 오류가 발생했습니다.'
      }
    }
  },
  methods: {
    /**
     * common error handler
     */
    handleError(error) {
      console.error(error)

      const message = error instanceof ApiBusinessError ? error.message : this.error.default

      alert(message)
      this.error.message = message
    }
  }
}