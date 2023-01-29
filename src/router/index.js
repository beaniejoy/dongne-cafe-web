import { createRouter, createWebHistory } from 'vue-router'
import RouterUtils from '@/utils/RouterUtils'
import HomeView from '@/views/HomeView.vue'
const LoginView = () => import(/* webpackChunkName: "login" */ '@/views/auth/LoginView.vue')
const SignupView = () => import(/* webpackChunkName: "signup" */ '@/views/auth/SignupView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: async (to, from, next) => {
      const isBlockEntrance = await RouterUtils.checkBlockEntranceByAuth(to, 'login')
      if (isBlockEntrance) {
        next({ name: 'home' })
        return
      }

      next()
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    beforeEnter: async (to, from, next) => {
      const isBlockEntrance = await RouterUtils.checkBlockEntranceByAuth(to, 'signup')
      if (isBlockEntrance) {
        next({ name: 'home' })
        return
      }

      next()
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
