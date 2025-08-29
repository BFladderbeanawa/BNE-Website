import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入 createPinia
import { useUserStore } from '@/stores/user'

import App from './App.vue'
import router from './router'

// 引入 Element Plus (如果需要)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)

// [修正 1] 创建并注册 Pinia 实例
// 必须在 router 之前！
const pinia = createPinia()
app.use(pinia)
const userStore = useUserStore()
userStore.fetchUserInfo()
// [修正 2] 在 Pinia 之后注册 Router
app.use(router)

// 注册其他插件
app.use(ElementPlus)


app.mount('#app')
