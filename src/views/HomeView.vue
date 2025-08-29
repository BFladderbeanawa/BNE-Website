<template>
  <div class="home">
    <!-- 公告/Banner区域 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in announcements" :key="item.id">
        <img :src="item.imageUrl" class="carousel-image" />
        <h3>{{ item.title }}</h3>
      </el-carousel-item>
    </el-carousel>

    <!-- 文章列表 -->
    <div class="article-list">
      <el-card v-for="article in articles" :key="article.id" class="article-card">
        <template #header>
          <div class="card-header">
            <span>{{ article.title }}</span>
            <el-button class="button" text>阅读更多</el-button>
          </div>
        </template>
        <p>{{ article.summary }}</p>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟数据，实际应用中应从后端获取
const announcements = ref([
  { id: 1, title: '重要公告一', imageUrl: 'https://via.placeholder.com/800x300' },
  { id: 2, title: '重要公告二', imageUrl: 'https://via.placeholder.com/800x300' },
  { id: 3, title: '重要公告三', imageUrl: 'https://via.placeholder.com/800x300' },
])

const articles = ref([
  { id: 1, title: '文章标题一', summary: '这是文章一的摘要...' },
  { id: 2, title: '文章标题二', summary: '这是文章二的摘要...' },
  { id: 3, title: '文章标题三', summary: '这是文章三的摘要...' },
])
</script>

<style scoped>
.home {
  padding: 20px;
}
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.article-list {
  margin-top: 40px;
}
.article-card {
  margin-bottom: 20px;
}
</style>
