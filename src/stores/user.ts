import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    username: '',
    // 新增 role 属性来区分用户和管理员
    role: 'user' as 'user' | 'admin'
  }),
  // 新增 getters，方便在组件中直接判断是否为管理员
  getters: {
    isAdmin: (state) => state.role === 'admin'
  },
  actions: {
    async login(username, password) {
      // --- 在这里调用您的 HFI 认证 API ---
      // 登录成功后，API 应该返回用户信息，包括用户的角色

      // 为了演示，我们做一个简单的模拟：
      // 如果用户名是 'admin'，我们就认为他是管理员
      this.isLoggedIn = true
      this.username = username
      if (username === 'admin') {
        this.role = 'admin'
      } else {
        this.role = 'user'
      }
    },
    logout() {
      const router = useRouter()
      this.isLoggedIn = false
      this.username = ''
      this.role = 'user'
      // 退出登录后跳转到主页
      router.push('/')
    }
  }
})
