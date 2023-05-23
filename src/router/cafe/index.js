const CafeListView = () => import(/* webpackChunkName: "cafeList" */ '@/views/cafe/CafeListView.vue')
const CafeDetailView = () => import(/* webpackChunkName: "cafeDetail" */ '@/views/cafe/CafeDetailView.vue')

export default [
  {
    path: '/cafes',
    name: 'CafeList',
    component: CafeListView
  },
  {
    path: '/cafes/:cafe_name',
    name: 'CafeDetail',
    sensitive: true,
    component: CafeDetailView
  }
]