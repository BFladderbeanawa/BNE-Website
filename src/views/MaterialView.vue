<template>
  <div>
    <h2>资料共享</h2>
    <el-upload class="upload-demo" action="YOUR_UPLOAD_API_ENDPOINT" :on-success="handleSuccess">
      <el-button type="primary">点击上传</el-button>
    </el-upload>

    <el-table :data="materials" style="width: 100%; margin-top: 20px">
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="uploader" label="上传者" />
      <el-table-column prop="status" label="状态" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟数据
const materials = ref([
  { name: '资料一.pdf', uploader: '张三', status: '已审核' },
  { name: '资料二.docx', uploader: '李四', status: '待审核' },
])

const handleSuccess = (response, file) => {
  // 文件上传成功后的处理逻辑
}
</script>
