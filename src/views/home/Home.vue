<template>
    <div class="home">
        <!-- 顶部导航栏 -->
        <nav-bar class="home-nav">
            <!-- 在组件中通过向插槽中插入具体的内容，这里只向中间插入了东西，左右没有做距离的设置 -->
            <div slot="center">购物车</div>
        </nav-bar>

        <!--首页上方轮播图, 数据是在home这个父组件中获取的，然后通过数据传递传送给子组件-->
        <home-swiper :banners="banners"></home-swiper>

        <!-- 首页上方推荐列表 -->
        <recommend-view :recommends="recommends"></recommend-view>

        <!-- 首页本周推荐栏 -->
        <feature-view></feature-view>

        <!-- 首页的控制栏 -->
        <!-- 每个不同的页面，控制栏要显示的文字是不同的，所以直接由父元素将需要显示的文字传递过去 -->
        <tab-control class="tab-control" :titles="['流行', '新款', '精选']"></tab-control>

        <ul class="ulbox">
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
// 导入公共组件
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'

// 导入首页中的子组件
import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

// 导入网络请求的相关组件
import {getHomeMultidata} from 'network/home'

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl
    },
    created () {
        // 页面创建时，立马调用方法获取数据
        this.getHomeMultidata()
    },
    data () {
        return {
            // 广告轮播图的数据
            banners: [],

            // 推荐介绍区域的数据
            recommends: [],
        }
    },
    methods: {
        // 获取首页轮播和导航的数据
        getHomeMultidata () {
            // 调用home.js中封装好的方法来发起请求，获取数据
            getHomeMultidata().then(response => {
                console.log(response)
                // 请求完成将数据赋值给项目中的变量
                this.banners = response.data.banner.list
                this.recommends = response.data.recommend.list
            })
        }
    }
}
</script>

<style scoped>
.home {
    /* 让整个页面距离顶部44px，这个刚好就可以放在顶部导航栏 */
    padding-top: 44px;
}
.home-nav {
    background-color: var(--color-tint);
    /* 设置字体颜色 */
    color: #fff;

    /* 设置导航栏是固定在页面上方的 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
}

/* 让控制栏在页面到达某个位置时就固定 */
.tab-control {
    position: sticky;
    /* 当页面滑动超过这个高度就会变成固定定位 */
    top: 44px;
}

.ulbox {
    width: 100%;
    height: 1000px;
}


</style>