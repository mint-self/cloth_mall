import Vue from 'vue'
import App from './App.vue'
// 导入路由实例
import router from './router'

Vue.config.productionTip = false

// 创建事件全局总线
Vue.prototype.$bus = new Vue()

new Vue({
  // 使用路由
  router,
  render: h => h(App),
}).$mount('#app')
