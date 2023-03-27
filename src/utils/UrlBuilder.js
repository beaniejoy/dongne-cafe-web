export class UrlBuilder {
  /**
   * API 호출을 위한 url 생성 (with parameters)
   * @param {string} path api url
   * @param {Object} params query string parameters
   */
  static createPathWithParams(path, params = {}) {
    const queries = Object.entries(params).map(([key, value]) => {
      console.log(key, value)
      return `${key}=${value}`
    }).join('&')

    return `${path}?${queries}`
  }
}