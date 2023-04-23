export default {
  data() {
    return {
      error: {
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
      
      if (typeof error !== 'object') {
        alert(this.error.default)
        return
      }

      const { response } = error
      alert(response?.data.errorCode ?? this.error.default)
    }
  }
}