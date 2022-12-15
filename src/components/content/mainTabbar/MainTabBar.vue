<template>
    <!-- 这些业务内容直接写在app.vue中会使得它里面很复杂，所以直接再将导航栏中的具体业务细节给抽取出来 -->
    <tab-bar>
      <!-- 在这个组件中插入一个个item组件，因为这个大的组件用了slot插槽，所以可以插入其他的组件 -->
      <!-- Vue在2.6.0,版本更新了有关插槽的大量内容,具名插槽和作用域插槽引入了一个新的语法v-slot来取代slot和slot-scope这两个已废弃但未移除的属性。所以使用原来的写法内容不能被渲染出来。

      修改：使用的每一个slot都需要一个 template 包裹，且 slot=“名称” 修改为 v-slot:名称
      -->

      <!-- 这里传递过去的path和active-color是直接用string类型，所以不用在path前面加上： -->
      <tab-bar-item path="/home" active-color="deeppink">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:item-active-icon>
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:item-active-icon>
          <img src="~assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/cart" active-color="deeppink">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:item-active-icon>
          <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/profile" active-color="deeppink">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:item-active-icon>
          <img src="~assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
    name: 'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style scoped>
</style>