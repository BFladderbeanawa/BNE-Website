<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <!-- 顶部导航栏 -->
      <el-header height="auto">
        <TopBar />
      </el-header>

      <!-- 主内容区域 -->
      <el-container>
        <!-- 侧边栏：仅在主页(name: 'home')显示 -->
        <Sidebar v-if="route.name === 'home'" />

        <!-- 页面视图 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import Sidebar from './components/Sidebar.vue'

// 获取当前路由信息
const route = useRoute()
</script>

<style>
/* 移除默认的 padding 和 margin */
body {
  margin: 0;
  padding: 0;
}
.el-header {
  padding: 0;
}
</style>
