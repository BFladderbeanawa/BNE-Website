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
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const bookingForm = reactive({
  subject: '',
  time: '',
  location: '',
})

const submitBooking = () => {
  // 在这里调用后端API提交预约信息
  console.log('预约信息:', bookingForm)
}
</script>
