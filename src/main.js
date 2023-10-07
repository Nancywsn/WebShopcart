import { createApp } from 'vue'
import App from './App.vue'
//导入当前项目的路由器
import router from './router'
//导入当前项目的全局管理对象
import store from './store'

//导入element-plus
import ElementPlus from 'element-plus'
//导入element-plus的样式
import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
