import Vue from 'vue';
import VueRouter from 'vue-router';
const HomeView = () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue');
const LoginView = () => import(/* webpackChunkName: "login" */ '@/views/auth/LoginView.vue');
const SignupView = () => import(/* webpackChunkName: "signup" */ '@/views/auth/SignupView.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
