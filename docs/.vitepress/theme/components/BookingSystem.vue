<template>
  <div class="booking-system">
    <div v-if="!isLoggedIn">
      <p>请先 <a href="#" @click.prevent="showLogin">登录</a> HFI 账号以使用预约功能。</p>
    </div>
    <div v-else>
      <h3>欢迎，{{ user.username }}</h3>
      <form @submit.prevent="submitBooking">
        <div class="form-group">
          <label for="subject">选择科目:</label>
          <select id="subject" v-model="booking.subject">
            <option>数学</option>
            <option>物理</option>
            <option>化学</option>
            <option>经济</option>
          </select>
        </div>
        <div class="form-group">
          <label for="time">选择时间:</label>
          <input type="datetime-local" id="time" v-model="booking.time">
        </div>
        <div class="form-group">
          <label for="location">选择地点:</label>
          <select id="location" v-model="booking.location">
            <option>图书馆讨论室 A1</option>
            <option>教学楼 302</option>
            <option>在线会议</option>
          </select>
        </div>
        <button type="submit">提交预约</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// --- 状态管理 ---
// 在真实应用中，用户登录状态 (isLoggedIn, user) 应该由全局状态管理器 (如 Pinia) 提供
const isLoggedIn = ref(true); // 假设用户已登录
const user = ref({ username: '示例用户' });

const booking = reactive({
  subject: '数学',
  time: '',
  location: '图书馆讨论室 A1'
});

function submitBooking() {
  // --- 后端集成点 ---
  // 在此将 booking 对象发送到后端 API 进行处理
  // 例如: axios.post('/api/bookings', booking)
  alert(`预约成功！\n科目: ${booking.subject}\n时间: ${booking.time}\n地点: ${booking.location}`);
}
</script>