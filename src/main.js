import Vue from 'vue'
import App from './App.vue'
// 导入路由实例
import router from './router'
// 导入vuex的store
import store from './store'

// 导入toast插件
import toast from 'components/common/toast'

// 安装插件
Vue.use(toast)

Vue.config.productionTip = false

// 创建事件全局总线
Vue.prototype.$bus = new Vue()

new Vue({
  // 使用路由
  router,
  // 使用vuex的store
  store,
  render: h => h(App),
}).$mount('#app')
