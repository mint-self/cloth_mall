<template>
    <div>
        <!-- 顶部导航栏 -->
        <detail-nav-bar/>
        <!-- 顶部轮播图 -->
        <detail-swiper :topImages="topImages"/>
        <!-- 商品详细信息 -->
        <detail-goods-desc :goods="goods"/>
    </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailGoodsDesc from './childComponents/DetailGoodsDesc.vue';

import { getDetail, Goods } from '@/network/detail';

export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailGoodsDesc
    },
    data () {
        return {
            // 存放商品唯一标识的iid
            iid: null,

            // 存储顶部轮播图的数据
            topImages: [],

            // 存储商品详细信息
            goods: {},

        }
    },
    created () {
        // 1 先保存商品的iid: 直接从跳转过来的路由路径中获取的
        this.iid = this.$route.params.iid

        // 2 根据iid发起请求获取详情页的数据
        getDetail (this.iid).then(res => {
            // 真正有用的数据都在res.result中，所以直接先拿出来
            const data = res.result
            console.log(data);
            // 2.1 获取顶部轮播图数据
            this.topImages = data.itemInfo.topImages
            // 2.2 获取商品详细信息：new一个实例对象，给对象传过去对应的参数
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        })

    },
}
</script>

<style scoped></style>