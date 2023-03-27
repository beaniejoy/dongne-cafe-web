const CafeListView = () => import(/* webpackChunkName: "cafeList" */ '@/views/cafe/CafeListView.vue')

export default [
  {
    path: '/cafes',
    name: 'CafeList',
    component: CafeListView
  }
]