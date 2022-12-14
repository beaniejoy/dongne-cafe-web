import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
const LoginView = () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue');

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
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
