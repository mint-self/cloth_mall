<template>
    <div id="detail">
        <!-- 顶部导航栏 -->
        <detail-nav-bar/>

        <!--以下部分需要滚动 -->
        <scroll class="scroll-content" ref="scroll">
            <!-- 顶部轮播图 -->
            <detail-swiper :top-images="topImages"/>
            <!-- 商品详细信息 -->
            <detail-goods-desc :goods="goods"/>
            <!-- 商家信息 -->
            <detail-shop-info :shop="shop"/>
            <!-- 商品细节信息 -->
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
            <!-- 商品参数信息 -->
            <detail-goods-params :paramsInfo="paramsInfo"/>
        </scroll>
        
    </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'

import DetailNavBar from './childComponents/DetailNavBar.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailGoodsDesc from './childComponents/DetailGoodsDesc.vue';
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue';
import DetailGoodsParams from './childComponents/DetailGoodsParams.vue';

import { getDetail, Goods, Shop, GoodsParams } from '@/network/detail';

export default {
    name: 'Detail',
    components: {
        Scroll,
        DetailNavBar,
        DetailSwiper,
        DetailGoodsDesc,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailGoodsParams,
    },
    data () {
        return {
            // 存放商品唯一标识的iid
            iid: null,

            // 存储顶部轮播图的数据
            topImages: [],

            // 存储商品详细信息
            goods: {},

            // 存储商家信息
            shop: {},

            // 存储商品细节信息
            detailInfo: {},

            // 存储商品参数信息
            paramsInfo: {},

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
            // 2.3 获取商家信息
            this.shop = new Shop(data.shopInfo)
            // 2.4 获取商品的细节信息
            this.detailInfo = data.detailInfo
            // 2.5 获取商品的参数
            this.paramsInfo = new GoodsParams(data.itemParams
.info, data.itemParams
.rule)

        })

    },
    methods: {
        // 监听商品信息中图片的加载
        imgLoad () {
            // 图片加载完成，就调用Scroll中的刷新一下,重新计算高度
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
#detail {
    /* 详情页不需要有底部的导航栏，所以要设置将它们隐藏 */
    position: relative;
    z-index: 9;
    /* 设置背景色，不让透明的还没法它们盖住 */
    background-color: #fff;
    /* 将界面的高度设置为视口高度，而不是实际高度 */
    height: 100vh;
}

/* 要滚动起来，要先设置好滚动区域的固定高度 */
.scroll-content {
    height: calc(100% - 44px);
    overflow: hidden;
}

</style>