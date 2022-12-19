<template>
    <div class="recommend-view">
        <div v-for="item in recommends" :key="item.image" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecommendView',
    props: {
        // 父组件home传递过来的推荐列表的数据
        recommends: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend-view {
    display: flex;
    width: 100%;
    /* 设置 */
    padding: 10px 0 20px;
    text-align: center;
    /* 加一个下边框 */
    border-bottom: 8px solid #eee;

}
.recommend-item {
    flex: 1;
}
.recommend-view img {
    width: 70px;
    height: 70px;
    margin-top: 8px;
}
</style>