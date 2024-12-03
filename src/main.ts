import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import eventBus from '../event-bus'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(antd)
app.use(pinia)

// 将事件总线挂载到全局属性上
app.config.globalProperties.$bus = eventBus

app.mount('#app')
