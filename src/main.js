import Vue from 'vue'
import App from './App.vue'
// 导入路由实例
import router from './router'
// 导入vuex的store
import store from './store'

// 导入toast插件
import toast from 'components/common/toast'
// 导入fastclick库
import FastClick from 'fastclick'
// 导入vue-lazyload库
import VueLazyLoad from 'vue-lazyload'

// 安装toast插件，相当于调用了toast的install函数方法
Vue.use(toast)
// 安装VueLazLoad插件 loading配置项可以设置当图片未加载出来时显示的占位符
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

// 创建事件全局总线
Vue.prototype.$bus = new Vue()

// 利用fastclick库解决移动端300ms延迟问题
FastClick.attach(document.body)

new Vue({
  // 使用路由
  router,
  // 使用vuex的store
  store,
  render: h => h(App),
}).$mount('#app')
