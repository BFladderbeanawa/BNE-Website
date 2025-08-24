import { reactive } from 'vue';

// 创建一个响应式的全局状态对象
export const store = reactive({
  // 初始状态：未登录
  user: null,
  token: localStorage.getItem('hfi_token') || null,

  /**
   * 核心登录方法
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<boolean>} 是否登录成功
   */
  async login(username, password) {
    try {
      // 1. 调用后端登录 API
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('登录失败');

      const data = await response.json();
      
      // 2. 登录成功，更新全局状态
      this.user = data.user;
      this.token = data.token;

      // 3. 将 Token 存入 localStorage，用于持久化登录
      localStorage.setItem('hfi_token', data.token);

      return true;
    } catch (error) {
      console.error(error);
      this.logout(); // 确保失败后状态被清空
      return false;
    }
  },

  /**
   * 登出方法
   */
  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('hfi_token');
  },

  /**
   * 应用加载时，尝试用已有的 Token 获取用户信息
   * 这是实现“刷新页面不掉线”的关键
   */
  async fetchUserOnLoad() {
    if (!this.token) return; // 如果没有token，直接返回

    try {
        const response = await fetch('/api/v1/auth/me', {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
        if (response.ok) {
            this.user = await response.json();
        } else {
            // 如果Token无效（过期或伪造），则登出
            this.logout();
        }
    } catch(error) {
        console.error("获取用户信息失败:", error);
        this.logout();
    }
  }
});