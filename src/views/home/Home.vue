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
        <!-- @tabClick="tabClick"绑定子组件tabControl传递过来的事件，可以接收到index -->
        <tab-control 
            class="tab-control" 
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick"
        ></tab-control>

        <!-- 商品数据列表 -->
        <!-- 将首页每个商品类型的数据传递过去 -->
        <goods-list :goods="showGoods"></goods-list>

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
import GoodsList from '@/components/content/goodsList/GoodsList.vue'

// 导入首页中的子组件
import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

// 导入网络请求的相关组件
import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
    name: 'Home',
    components: {
        NavBar,
        TabControl,
        GoodsList,
        HomeSwiper,
        RecommendView,
        FeatureView
    },
    created () {
        // 页面创建时，立马调用方法获取数据
        this.getHomeMultidata()

        // 获取首页商品列表,首页有三种类型的商品都获取过来
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    data () {
        return {
            // 广告轮播图的数据
            banners: [],

            // 推荐介绍区域的数据
            recommends: [],

            // 首页商品数据列表，因为有不同的商品类型，每个类型里面又有页数的属性，所以用对象来存储，key value
            goods: {
                'pop': { page: 0, list: [] },
                'new': { page: 0, list: [] },
                'sell': { page: 0, list: [] }
            },

            // 当前选中的商品类型
            currentType: 'pop'
        }
    },
    computed: { 
        // 计算要显示哪个类型的商品
        showGoods () {
            // 点击了控制栏的哪个文字标题就将它的类型传递过去
            return this.goods[this.currentType].list
        }
    },
    methods: {
        /**
         * 数据监听的方法
         */
        // 点击控制栏时，根据点击的
        tabClick (index) {
            // 判断是点击了哪个tab，如果是第一个类型就是'pop'，以此类推
            switch(index) {
                case 0: 
                    this.currentType = 'pop'
                    break;
                case 1:
                    this.currentType = 'new'
                    break;
                case 2: 
                    this.currentType = 'sell'
                    break;
            }
        },

        /**
         * 网络请求的相关方法
         */
        // 获取首页轮播和导航的数据
        getHomeMultidata () {
            // 调用home.js中封装好的方法来发起请求，获取数据
            getHomeMultidata().then(response => {
                console.log(response)
                // 请求完成将数据赋值给项目中的变量
                this.banners = response.data.banner.list
                this.recommends = response.data.recommend.list
            })
        },

        // 获取首页商品列表的数据
        getHomeGoods(type) {
            // 设置页数, 一开始默认请求第一页，然后
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
                console.log(res);
                // 给每个类型的商品赋值
                this.goods[type].list.push(...res.data.list)
                // 给每个类型的商品页数加1
                this.goods[type].page += 1
                // console.log(this.goods['new']);
                // console.log('=======================================');
                // console.log(this.currentType);
                // console.log(this.goods[this.currentType]);
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