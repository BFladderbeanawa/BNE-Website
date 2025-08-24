<template>
  <div class="admin-dashboard">
    <div v-if="!isAdmin">
      <p>您没有权限访问此页面。</p>
    </div>
    <div v-else>
      <h2>导师预约审核</h2>
      <ul>
        <li v-for="b in pendingBookings" :key="b.id">
          {{ b.user }} 预约了 {{ b.subject }} - {{ b.time }}
          <button @click="approve('booking', b.id)">批准</button>
          <button @click="reject('booking', b.id)">拒绝</button>
        </li>
      </ul>
      <hr>
      <h2>上传资料审核</h2>
      <ul>
        <li v-for="f in pendingFiles" :key="f.id">
          {{ f.user }} 上传了 <a :href="f.url">{{ f.name }}</a>
          <button @click="approve('file', f.id)">批准</button>
          <button @click="reject('file', f.id)">拒绝</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 假设通过登录信息判断是否是管理员
const isAdmin = ref(true); 

// --- 后端集成点 ---
// 这些数据应该从后端 API 获取
const pendingBookings = ref([
  { id: 1, user: '张三', subject: '物理', time: '2025-09-05 15:00' }
]);
const pendingFiles = ref([
  { id: 1, user: '李四', name: 'AP物理考纲.pdf', url: '#' }
]);

function approve(type, id) {
  // 向后端发送批准请求
  alert(`已批准 ${type} #${id}`);
}
function reject(type, id) {
  // 向后端发送拒绝请求
  alert(`已拒绝 ${type} #${id}`);
}
</script>