import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
const LoginView = () => import(/* webpackChunkName: "login" */ '@/views/auth/LoginView.vue');
const SignupView = () => import(/* webpackChunkName: "signup" */ '@/views/auth/SignupView.vue');

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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
