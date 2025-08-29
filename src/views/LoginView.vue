<template>
  <div class="login-container">
    <el-form :model="loginForm" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loginForm = reactive({
  username: '',
  password: '',
})

const handleLogin = async () => {
  // 这里应该调用后端API进行登录验证
  // 模拟登录成功
  await userStore.login(loginForm.username, loginForm.password)
  router.push('/')
}
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
}
</style>
