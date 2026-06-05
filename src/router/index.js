import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: { title: '套餐列表' },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/Detail/index.vue'),
    meta: { title: '套餐详情' },
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('@/views/Booking/index.vue'),
    meta: { title: '在线预约' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
