const AuthView = () => import(/* webpackChunkName: "auth" */ '@/views/member/AuthView.vue')
const LoginView = () => import(/* webpackChunkName: "login" */ '@/views/member/LoginView.vue')
const SignupView = () => import(/* webpackChunkName: "signup" */ '@/views/member/SignupView.vue')
import RouterUtils from '@/utils/RouterUtils'

export default [
  {
    path: '/member',
    name: 'Member',
    component: AuthView,
    children: [
      {
        path: '/member/login',
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
        path: '/member/signup',
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
]