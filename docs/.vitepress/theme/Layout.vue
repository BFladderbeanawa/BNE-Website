<script setup>
  import DefaultTheme from 'vitepress/theme';
  import { ref, computed, onMounted } from 'vue';
  import { store } from './store.js'; // 引入 store
  import LoginModal from './components/LoginModal.vue';

  // 计算属性，自动响应 store.user 的变化
  const isLoggedIn = computed(() => !!store.user);

  // 控制登录弹窗的显示
  const showLoginModal = ref(false);

  // 【关键】当组件挂载（即网站加载）时，调用 store 的方法检查本地 Token
  onMounted(() => {
    store.fetchUserOnLoad();
  });
</script>
<template>
  <DefaultTheme.Layout>
  <!-- 在导航栏右侧添加登录/用户信息区域 -->
  <template #nav-bar-content-after>
    <div class="auth-links">
      <div v-if="isLoggedIn" class="user-info">
        <span>欢迎, {{ store.user.name }}</span>
        <a href="#" @click.prevent="store.logout()" class="logout-button">退出</a>
      </div>
      <div v-else>
        <a href="#" @click.prevent="showLoginModal = true">登录</a>
      </div>
    </div>
  </template>
  <!-- 其他页面内容... -->

  <!-- 登录弹窗组件 -->
  <LoginModal :show="showLoginModal" @close="showLoginModal = false" />
  </DefaultTheme.Layout>
</template>
<style scoped>
  .auth-links {
    padding: 0 1rem;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .logout-button {
    color: #c0392b;
  }
</style>