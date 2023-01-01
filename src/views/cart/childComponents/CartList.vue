<template>
    <div class="cart-list">
        <scroll class="content" :click="true">
            <!-- 放入每个商品列表项 -->
            <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
            <div class="box"></div>
        </scroll>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Scroll from '@/components/common/scroll/Scroll.vue';
import CartListItem from './CartListItem.vue';

export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem
    },
    computed: {
        // 将getters中的变量映射为computed属性
        ...mapGetters(['cartList'])
    }
}
</script>

<style scoped>
.box {
    height: 1000px;
}

/* 这个滚动是直接设置在滚动内容的,所以父容器的高度设置和之前的不太一样 */
.cart-list {
    height: calc(100vh - 44px);
}
.content {
    height: 100%;
    overflow: hidden;
}
</style>