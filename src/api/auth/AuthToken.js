class AuthToken {
  accessToken = null;

  updateAccessToken(newAccessToken) {
    this.accessToken = newAccessToken
  }

  isAuthenticated() {
    return this.accessToken != null
  }
}

export const authToken = new AuthToken()