<template>
  <div class="file-sharing">
     <div v-if="!isLoggedIn">
      <p>请先 <a href="#" @click.prevent="showLogin">登录</a> HFI 账号以上传和查看资料。</p>
    </div>
    <div v-else>
      <div class="upload-section">
        <h3>上传资料</h3>
        <p>所有上传的资料都需要经过管理员审核后才会公开。</p>
        <input type="file" @change="handleFileUpload">
        <button @click="uploadFile">上传</button>
      </div>
      <div class="file-list">
        <h3>可用资料</h3>
        <ul>
          <li v-for="file in files" :key="file.id">
            <a :href="file.url" target="_blank">{{ file.name }}</a>
            <span>(上传者: {{ file.uploader }})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(true); // 假设用户已登录
const selectedFile = ref(null);
const files = ref([
  { id: 1, name: '微积分入门笔记.pdf', url: '#', uploader: '学长A' },
  { id: 2, name: '宏观经济学重点整理.docx', url: '#', uploader: '学姐B' },
]);

function handleFileUpload(event) {
  selectedFile.value = event.target.files[0];
}

function uploadFile() {
  if (!selectedFile.value) {
    alert('请先选择文件！');
    return;
  }
  // --- 后端集成点 ---
  // 使用 FormData 来构建表单数据，并发送到后端 API
  // const formData = new FormData();
  // formData.append('file', selectedFile.value);
  // axios.post('/api/files/upload', formData);
  alert(`文件 "${selectedFile.value.name}" 已提交审核！`);
}
</script>