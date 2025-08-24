<template>
  <div class="home-page">
    <div class="hero">
      <img src="./img/homepage_img/Template.png" alt="HFI Campus" class="hero-image">
      <div class="hero-text">
        <h1>HFI 学生中心</h1>
        <p>一个分享知识、预约辅导、共同进步的平台</p>
      </div>
    </div>
    <div class="content-grid">
      <div class="main-content">
        <h2>最新文章</h2>
        <div class="post-card large">
          <img src="./img/homepage_img/Template.png" alt="Post Image">
          <div class="card-content">
            <h3>热烈欢迎2025届新生</h3>
            <p>点击查看新生入学指南和注意事项...</p>
            <a href="/articles/2025-08-24-welcome.html" class="read-more">阅读更多</a>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <h2>公告栏</h2>
        <ul class="announcement-list">
          <li>[重要] 关于选课系统的开放通知</li>
          <li>[活动] 九月编程马拉松开始报名！</li>
          <li>[通知] 图书馆开放时间调整</li>
        </ul>
        <h2 style="margin-top: 2rem;">往期文章</h2>
        <ul class="archive-list">
          <li><a href="/articles/2025-08-23-new-feature.html">新功能上线：导师预约系统</a></li>
          <!-- 更多文章... -->
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 在这里添加大图、大版面的 CSS 样式 */
.hero {
  position: relative;
  text-align: center;
  color: white;
}
.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.6);
}
.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content-grid {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}
.main-content {
  flex: 3;
}
.sidebar {
  flex: 1;
}
.post-card.large {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.post-card.large img {
  width: 100%;
}
.card-content {
  padding: 1.5rem;
}
</style>