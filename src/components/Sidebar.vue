<template>
  <el-aside width="200px" class="sidebar">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>
          <span>往期文章</span>
        </template>
        <el-menu-item-group title="2024年">
          <el-menu-item index="1-1">10月</el-menu-item>
          <el-menu-item index="1-2">9月</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="2023年">
          <el-menu-item index="1-3">12月</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  border-right: 1px solid #e6e6e6;
}
</style>
