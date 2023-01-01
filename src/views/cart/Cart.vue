<template>
    <div class="cart">
        <!-- 顶部导航栏 -->
        <nav-bar class="nav-bar">
            <!-- 要同时显示购物车中商品的个数 -->
            <div slot="center">购物车({{ cartLength }})</div>

            <!-- getters对象写法 -->
            <!-- <div slot="center">购物车({{ length }})</div> -->
        </nav-bar>

        <!-- 购物车商品列表 -->
        <cart-list></cart-list>

        <!-- 底部工具栏 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';

import CartList from './childComponents/CartList.vue';
import CartBottomBar from './childComponents/CartBottomBar.vue';

// 导入vuex中的getters, 并且使用vuex的解构赋值
import { mapGetters } from 'vuex';

export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        /*
        // 可以直接用getters中的数据,并且可以将getters中的转为computed计算属性来用
        // 计算购物车中商品对象的数量
        cartLength () {
            return this.$store.state.cartList.length
        }
        */
        // 数组写法
        ...mapGetters(['cartLength'])

        // 对象写法
        // ...mapGetters({
        //     length: 'cartLength'
        // })
    }
}
</script>

<style scoped>
.nav-bar {
    background-color:var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
}
</style>