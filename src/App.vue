<template>
  <div id="app">
    <!-- 详情页不用keep-alive, 因为详情页需要每进入一个商品item都要重新获取该商品的iid从而来呈现出该商品的详细信息，如果设置了keep-alive，则每次详情页都是一样的，就不会重新刷新了 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <!-- 使用底部导航栏组件 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/* 导入整个项目中的基础样式设置 */
@import 'assets/css/base.css'
</style>
