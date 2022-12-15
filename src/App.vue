<template>
  <div id="app">
    <router-view></router-view>
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

</style>
