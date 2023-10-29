const AuthView = () => import(/* webpackChunkName: "auth" */ '@/views/auth/AuthView.vue')
const LoginView = () => import(/* webpackChunkName: "login" */ '@/views/auth/LoginView.vue')
const SignupView = () => import(/* webpackChunkName: "signup" */ '@/views/auth/SignupView.vue')

export default [
  {
    path: '/account',
    name: 'Auth',
    component: AuthView,
    children: [
      {
        path: '/account/login',
        name: 'Login',
        component: LoginView,
        meta: {
          requiresOnlyNotAuth: true
        },
      },
      {
        path: '/account/signup',
        name: 'SignUp',
        component: SignupView,
        meta: {
          requiresOnlyNotAuth: true
        },
      },
    ]
  },
]