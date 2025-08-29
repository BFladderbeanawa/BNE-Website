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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus' // Import ElMessage for feedback

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false) // Add a loading state

const loginForm = reactive({
  username: '',
  password: '',
})

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.warning('Please enter username and password.')
    return
  }

  loading.value = true
  const success = await userStore.login(loginForm.username, loginForm.password)
  loading.value = false

  if (success) {
    ElMessage.success('Login successful!')
    router.push('/') // Redirect to homepage on success
  } else {
    ElMessage.error('Login failed. Please check your credentials.')
  }
}
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
}
</style>
