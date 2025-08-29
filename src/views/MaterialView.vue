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
import { ref, onMounted } from 'vue'
import apiClient from '@/api'
import { ElMessage } from 'element-plus'

const materials = ref([])
const loading = ref(true)

const fetchMaterials = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/material')
    materials.value = response.data
  } catch (error) {
    console.error('Failed to fetch materials:', error)
    ElMessage.error('无法加载物资列表')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMaterials()
})
</script>
