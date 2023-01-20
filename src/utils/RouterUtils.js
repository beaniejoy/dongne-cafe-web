import CookiesUtils from '@/utils/CookiesUtils';
import { authService } from '@/api/auth/AuthService';

/**
 * vue router 프로세스 지원 util class
 */
export default class RouterUtils {
  /**
   * 인증된 사용자에 대해서 특정 페이지 진입 차단
   * ex. login, signup, ...
   * @param {object} to - router 진입 타겟 component(to)
   * @param {string} target - 인증된 사용자에 대해서 진입 차단할 component
   * @returns {boolean} 차단 여부 체크 값 (true: 차단, false: 진입 가능)
   */
  static async checkBlockEntranceByAuth(to, target) {

    if (!CookiesUtils.getCookie(process.env.VUE_APP_ACCESS_TOKEN_COOKIE)) {
      return false;
    }

    // 인증된 사용자 여부 체크
    const isAuthenticated = await authService.checkAuthenticated();
    console.log('isAuthenticated:', isAuthenticated);
    if (isAuthenticated && to.name === target) {
      return true;        
    }

    return false;
  }
}
