export class ApiBusinessError extends Error {
  constructor(code, message) {
    super(message)

    // can access 'stack' field
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiBusinessError)
    }

    this.code = code
    this.message = message
  }
}