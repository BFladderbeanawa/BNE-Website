<template>
  <div>
    <h2>导师预约系统</h2>
    <el-form>
      <el-form-item label="选择科目">
        <el-select v-model="bookingForm.subject" placeholder="请选择科目">
          <el-option label="数学" value="math"></el-option>
          <el-option label="物理" value="physics"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker v-model="bookingForm.time" type="datetime" placeholder="选择日期时间" />
      </el-form-item>
      <el-form-item label="选择地点">
        <el-select v-model="bookingForm.location" placeholder="请选择地点">
          <el-option label="教室A" value="A"></el-option>
          <el-option label="教室B" value="B"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitBooking">提交预约</el-button>
      </el-form-item>
    </el-form>

    <el-divider />

    <h3>我的预约</h3>
    <el-table :data="bookings" v-loading="loading">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="materialId" label="物资ID" />
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="status" label="状态" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api'
import { ElMessage } from 'element-plus'

const bookings = ref([]) // To store bookings from the API
const loading = ref(true)

// Function to fetch bookings
const fetchBookings = async () => {
  loading.value = true
  try {
    const response = await apiClient.get('/booking')
    bookings.value = response.data
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    ElMessage.error('无法加载预约列表')
  } finally {
    loading.value = false
  }
}

// Fetch data when the component is first mounted
onMounted(() => {
  fetchBookings()
})

// Function to submit a new booking
const submitBooking = async () => {
  // Replace with your actual form data
  const newBookingData = { materialId: 1, date: '2025-09-15' }

  try {
    await apiClient.post('/booking', newBookingData)
    ElMessage.success('预约成功!')
    fetchBookings() // Refresh the list after successful creation
  } catch (error) {
    console.error('Failed to create booking:', error)
    ElMessage.error('预约失败')
  }
}
</script>
