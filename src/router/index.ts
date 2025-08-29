import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/material',
      name: 'material',
      component: () => import('../views/MaterialView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: 'bookings',
          name: 'manage-booking',
          // [修正 1] 使用 'component' (单数)
          component: () => import('../views/admin/ManageBooking.vue')
        },
        {
          path: 'materials',
          name: 'manage-material',
          // [修正 1] 使用 'component' (单数)
          component: () => import('../views/admin/ManageMaterial.vue')
        }
      ]
    }
  ]
})

// [修正 2] 更新路由守卫逻辑
router.beforeEach((to, from, next) => {
  // [修正] 在守卫函数内部获取 store 实例
  // 此时，路由跳转真正发生，main.ts 已经执行完毕，Pinia 已激活
  const userStore = useUserStore()

  if (to.meta.requiresAdmin) {
    if (userStore.isLoggedIn && userStore.isAdmin) {
      next()
    } else {
      next({ name: 'home' })
    }
  }
  else if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'login' })
  }
  else {
    next()
  }
})

export default router
