<template>
  <div class="login-modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h3>HFI 账号登录</h3>
      <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="学号/邮箱" required>
        <input type="password" v-model="password" placeholder="密码" required>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* 
  .login-modal: 这是半透明的背景遮罩。
  - position: fixed; 让它相对于浏览器窗口定位，覆盖整个屏幕。
  - z-index: 1000; 确保它在所有页面内容之上。
  - display: flex; align-items: center; justify-content: center; 这是一个现代CSS技巧，可以轻松地将子元素（内容框）垂直和水平居中。
*/
.login-modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 半透明黑色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

/*
  .modal-content: 这是白色的、包含表单的内容框。
  - background: white; 设置背景色。
  - padding: 2rem; 提供内部空间。
  - border-radius: 8px; 圆角，使其更美观。
  - width: 90%; max-width: 400px; 设置宽度和最大宽度，以适应不同屏幕。
  - position: relative; 这是为了让关闭按钮 (span.close) 可以相对于它进行定位。
*/
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,.3);
  width: 90%;
  max-width: 400px;
  position: relative;
}

/*
  .close: 右上角的 '×' 关闭按钮。
*/
.close {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}

/*
  简单的表单样式
*/
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 10px 15px;
  border: none;
  background-color: #3eaf7c; /* VitePress 绿色主题色 */
  color: white;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #48cfa4;
}

.error-message {
  color: #c0392b;
  font-size: 0.9em;
  text-align: center;
}
</style>

<script setup>
import { ref } from 'vue';
import { store } from '../store.js'; // 引入全局 store

defineProps(['show']);
const emit = defineEmits(['close']);

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

async function handleLogin() {
  loading.value = true;
  error.value = null;

  // 调用 store 的 login 方法，把复杂的逻辑都交给 store
  const success = await store.login(username.value, password.value);

  loading.value = false;
  if (success) {
    emit('close'); // 登录成功，关闭弹窗
  } else {
    error.value = '登录失败，请检查您的账号和密码。';
  }
}
</script>