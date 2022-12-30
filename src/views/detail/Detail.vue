<template>
    <div id="detail">
        <!-- 顶部导航栏 -->
        <detail-nav-bar @titleClick="titleClick" ref="nav"/>

        <!--以下部分需要滚动 -->
        <scroll 
            class="scroll-content" 
            ref="scroll" 
            :click="true"
            :probe-type="3"
            @scroll="scroll"
        >
            <!-- 顶部轮播图 -->
            <detail-swiper :top-images="topImages"/>
            <!-- 商品详细信息 -->
            <detail-goods-desc :goods="goods"/>
            <!-- 商家信息 -->
            <detail-shop-info :shop="shop"/>
            <!-- 商品细节信息 -->
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
            <!-- 商品参数信息 -->
            <detail-goods-params :paramsInfo="paramsInfo" ref="params"/>
            <!-- 商品评论信息 -->
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <!-- 商品推荐列表 -->
            <goods-list :goods="recommends" ref="recommends"/>
        </scroll>

        <!-- 底部工具栏 -->
        <detail-bottom-bar />
    </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goodsList/GoodsList.vue';

import DetailNavBar from './childComponents/DetailNavBar.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailGoodsDesc from './childComponents/DetailGoodsDesc.vue';
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue';
import DetailGoodsParams from './childComponents/DetailGoodsParams.vue';
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue';
import DetailBottomBar from './childComponents/DetailBottomBar.vue';


import { getDetail, getRecommend, Goods, Shop, GoodsParams } from '@/network/detail';
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'

export default {
    name: 'Detail',
    components: {
        Scroll,
        GoodsList,
        DetailNavBar,
        DetailSwiper,
        DetailGoodsDesc,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailGoodsParams,
        DetailCommentInfo,
        DetailBottomBar
    },
    // 设置混入，取代重复代码
    mixins: [itemListenerMixin],
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

            // 存储商品评价信息
            commentInfo: {},

            // 存储推荐商品的数据
            recommends: [],

            // 存放每个主题组件的offsetTop值
            themeTopYs: [],

            // 顶部导航栏当前点击的主题的索引
            currentIndex: 0,
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
            // 2.6 获取商品评论信息
            if (data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
        })

        // 3 获取详情页推荐列表的数据
        getRecommend().then( res => {
            console.log(res);
            this.recommends = res.data.list
        })

        /* 第二种方式：在获取数据之后，获取offsetTop: 但是这种方式，数据请求之后，DOM不一定渲染了，所以还是有些组件会得到undefined, 可以放在updated()中，有了数据之后会执行updated()，但在updated()中会重复执行多次，可以直接放在$nextTick中，直接等数据变化后DOM更新完成再执行相应的操作
        // 获取每个主题组件的offsetTop
        // 商品
        this.themeTopYs.push(0)
        // 参数
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // 评论
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // 推荐
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        console.log(this.themeTopYs);
        */

        /* 第四种方式，放在$nextTick()中：但是有些图片还是没有加载完成，所以获取的高度还是不准确，所以应该放在图片都加载完成后才去获取 
        this.$nextTick(() => {
            // 获取每个主题组件的offsetTop
            this.themeTopYs = []
            // 商品
            this.themeTopYs.push(0)
            // 参数
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // 评论
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // 推荐
            this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
            console.log(this.themeTopYs);
        })
        */

        // 为获取每个主题组件的offsetTop函数设置防抖，避免重复加载多次
        this.getThemeTopYs = debounce(() => {
            // 先将数组置空
            this.themeTopYs = []
            // 商品
            this.themeTopYs.push(0)
            // 参数
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            // 评论
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // 推荐
            this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

            // 在数组某位加一个js中的无穷大的数值
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(this.themeTopYs);
        }, 100)
    },
    mounted () {
        /* 设置了混入，取消了这些重复代码
        // 设置防抖的刷新函数
        let refresh = debounce(this.$refs.scroll.refresh, 100)
        // 监听图片的加载，图片加载并刷新
        this.$bus.$on('itemImageLoad', () => {
            refresh()
        })
        */

        /* 第一种方式在mounted()中拿offsetTop: 但是放在mounted()中，有些组件设置了v-if判断是否有对应的数据对象，有才显示，但是组件刚挂载时，不一定发送数据请求完成了，所以不一定有数据，这样的话就不一定能拿到$el，结果就会为undefined
        // 获取每个主题组件的offsetTop
        // 商品
        this.themeTopYs.push(0)
        // 参数
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // 评论
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // 推荐
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        console.log(this.themeTopYs);
        */

    },
    updated () {
        /* 第三种方式放在updated(): 可以放在updated()中，有了数据之后会执行updated()，但在updated()中会重复执行多次，可以直接放在$nextTick中，直接等数据变化后DOM更新完成再执行相应的操作
        // 获取每个主题组件的offsetTop
        // 商品
        this.themeTopYs.push(0)
        // 参数
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // 评论
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // 推荐
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        console.log(this.themeTopYs);
        */
    },
    destroyed () {
        // 离开组件时取消图片监听
        this.$bus.$off('itemImageLoad', this.itemImgListener)
        
    },
    methods: {
        // 监听商品信息中图片的加载
        imgLoad () {
            // 图片加载完成，就调用Scroll中的刷新一下,重新计算高度
            this.$refs.scroll.refresh()

            /* 可以执行的方式: 放在图片加载完成之后，这样获取的高度才是正确的*/
            // 调用已经设置了防抖的函数
            this.getThemeTopYs()
        },

        // 点击顶部导航栏的事件
        titleClick (index) {
            // 点击不同的主题滚动到对应的内容区域
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
        },

        // 滚动事件，可以获取滚动区域的某个位置
        scroll (position) {
            // 1 获取高度y值
            const positionY = -position.y
            // console.log(positionY);

            // 2 将positionY和主题中的高度值offsetTop做比较判断
            // 比如：[0, 6158, 6835, 7185]
            // 如果positionY 在0 和 6158之间，那么就是商品区域，index = 0
            // 如果positionY 在6158 和 6835之间，那么就是参数区域，index = 1
            // 如果positionY 在6835 和 7185之间，那么就是评论区域，index = 2
            // 如果positionY 大于7185，那么就是推荐区域，index = 3
            // 另一种做法：如果positionY 在7185 和 无穷大之间，那么就是推荐区域，index = 3

            // 循环遍历出themeTopYs中的值，来和positionY做比较
            // for (let i in this.themeTopYs) 用这种方式的话，i是一个string类型

            let length = this.themeTopYs.length
            /*
            for (let i = 0; i < length; i++) {
                /* 不要直接这么判断，因为这里的length是没有 - 1的，所以length的长度就是数组的总长度，那么索引i的值就是0 1 2 3这几种情况，所以 i+1就有可能出现数组越界的情况，就会出错，所以拆分为2部分来判断，当索引小于length -1 的一部分和索引等于length-1的一部分
                if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {

                }
                */

                /* 这种方式，判断条件会比较复杂
                // 如果不想重复比较多次，那么就是直接比较this.currentIndex !== i的情况，因为相等的情况，就肯定是在对应的区域中
                if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
                */
            /*
            }
            */

            /* 另一种做法，就是给this.themeTopYs数组加一个无穷大的元素，这样数组的元素就多了一个，然后索引i就不会出现越界，就可以直接用原始的方式来判断*/
            for (let i = 0; i < length -1; i++) {
                // 元素的有 0 1 2 3 无穷大的数，长度是5，length - 1为4,这里的索引i为 0 1 2 3
                if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                    this.currentIndex = i 
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
        
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

/* 要滚动起来，要先设置好滚动区域的固定高度:减去顶部和底部的工具栏，只剩中间区域滚动 */
.scroll-content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>