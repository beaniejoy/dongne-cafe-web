import { createRouter, createWebHistory } from 'vue-router'
import cafeRoutes from '@/router/cafe'
import authRoutes from '@/router/auth'
import { authService } from '@/api/auth/AuthService'
import { authToken } from '@/api/auth/AuthToken'
import { ApiBusinessError } from '@/api/error/ApiBusinessError'

const HomeView = () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  ...authRoutes,
  ...cafeRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/**
 * requiresOnlyNotAuth: 인증 받지 않은 사용자만 허용된 페이지
 */
router.beforeEach(async (to, from, next) => {
  try {
    // silent renew token
    if (!to.meta.requiresOnlyNotAuth && !authToken.isAuthenticated()) {
      const renewResponse = await authService.renewAuthToken()
      authToken.updateAccessToken(renewResponse.data.accessToken)
    }
    
    // 인증 받은 사용자가 허용되지 않은 페이지에 진입하는 경우
    if (to.meta.requiresOnlyNotAuth && authToken.isAuthenticated()) {
      next({ name: 'Home' })
      return
    }
    
    next()
  } catch (error) {
    if (error instanceof ApiBusinessError) {
      next()
      return
    }

    console.error(error)
    alert(error.message)
  }
})

export default router
