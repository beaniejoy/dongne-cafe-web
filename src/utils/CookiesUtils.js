import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

export default class CookiesUtils {
  static getCookie(key) {
    return cookies.get(key);
  }
  
  static setCookie(key, value, expireTimes, path = '/') {
    cookies.set(key, value, expireTimes, path);
  }
  
  static removeIfExisted(key) {
    if (this.hasKey(key)) {
      cookies.remove(key);
      return true;
    }

    return false;
  }

  static hasKey(key) {
    return cookies.isKey(key);
  }
}