<template>
    <div class="goods-list">
        <!-- 商品列表放入一个个item项 -->
        <goods-list-item v-for="(item, index) in goods" :key="index" :goods-list-item="item"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
export default {
    name: 'GoodsList',
    components: {
        GoodsListItem
    },
    props: {
        // 接收父组件传递过来的商品类型和商品数据
        goods: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods-list {
    display: flex;
    /* 换行显示 */
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>