import { createRouter, createWebHistory } from 'vue-router'
import cafeRoutes from '@/router/cafe'
import memberRoutes from '@/router/member'

const HomeView = () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  ...memberRoutes,
  ...cafeRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
