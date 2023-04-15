import { createRouter, createWebHistory } from 'vue-router'
import RouterUtils from '@/utils/RouterUtils'
import cafeRoutes from '@/router/cafe'

const HomeView = () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
const AuthView = () => import(/* webpackChunkName: "auth" */ '@/views/auth/AuthView.vue')
const LoginView = () => import(/* webpackChunkName: "login" */ '@/views/auth/LoginView.vue')
const SignupView = () => import(/* webpackChunkName: "signup" */ '@/views/auth/SignupView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: LoginView,
        beforeEnter: async (to, from, next) => {
          const isBlockEntrance = await RouterUtils.checkBlockEntranceByAuth(to, 'Login')
          if (isBlockEntrance) {
            next({ name: 'Home' })
            return
          }
    
          next()
        }
      },
      {
        path: '/auth/signup',
        name: 'SignUp',
        component: SignupView,
        beforeEnter: async (to, from, next) => {
          const isBlockEntrance = await RouterUtils.checkBlockEntranceByAuth(to, 'SignUp')
          if (isBlockEntrance) {
            next({ name: 'Home' })
            return
          }
    
          next()
        }
      },
    ]
  },
  ...cafeRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
