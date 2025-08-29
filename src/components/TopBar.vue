<template>
  <el-menu mode="horizontal" :router="true" :default-active="$route.path" class="top-bar">
    <el-menu-item index="/">主页</el-menu-item>
    <el-menu-item index="/booking">导师预约</el-menu-item>
    <el-menu-item index="/materials">资料共享</el-menu-item>

    <!-- 仅当用户是管理员时显示 -->
    <el-menu-item v-if="userStore.isAdmin" index="/admin"> 管理员系统 </el-menu-item>

    <div class="flex-grow" />

    <!-- 根据登录状态显示不同内容 -->
    <el-menu-item v-if="!userStore.isLoggedIn" index="/login"> 登录 </el-menu-item>

    <el-sub-menu v-else index="user-menu">
      <template #title>欢迎, {{ userStore.username }}</template>
      <el-menu-item @click="handleLogout">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

// 获取 user store 实例
const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  // 调用 store中的 logout action
  userStore.logout()
  // 提示用户已退出
  ElMessage.success('您已成功退出登录')
  router.push('/login')
}
</script>

<style scoped>
.top-bar {
  border-bottom: solid 1px var(--el-menu-border-color);
}
.flex-grow {
  flex-grow: 1;
}
</style>
