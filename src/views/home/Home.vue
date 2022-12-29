<template>
    <div class="home">
        <!-- 顶部导航栏 -->
        <nav-bar class="home-nav">
            <!-- 在组件中通过向插槽中插入具体的内容，这里只向中间插入了东西，左右没有做距离的设置 -->
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control 
            class="tab-control" 
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick"
            ref="tabControll1"
            v-show="isTabControllFixed"
        />
        <!-- 以下组件都放在移动端滚动组件中 -->
        <!-- probe-type="3"传递给Scroll组件，当值为3表示要监听滚动的位置；pull-up-load="true" 表示要监听上拉事件
        -->
            <scroll 
                class="scroll-content" 
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                :click="true"
                @scroll="contentScroll"
                @pullingUp="loadMore"
            >
                <!--首页上方轮播图, 数据是在home这个父组件中获取的，然后通过数据传递传送给子组件-->
                <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>

                <!-- 首页上方推荐列表 -->
                <recommend-view :recommends="recommends"></recommend-view>

                <!-- 首页本周推荐栏 -->
                <feature-view></feature-view>

                <!-- 首页的控制栏 -->
                <!-- 每个不同的页面，控制栏要显示的文字是不同的，所以直接由父元素将需要显示的文字传递过去 -->
                <!-- @tabClick="tabClick"绑定子组件tabControl传递过来的事件，可以接收到index -->
                <tab-control 
                    :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"
                    ref="tabControll2"
                />

                <!-- 商品数据列表 -->
                <!-- 将首页每个商品类型的数据传递过去 -->
                <goods-list :goods="showGoods"></goods-list>
            </scroll>

        <!-- 回到顶部的按钮 -->
        <!-- 实现点击就回到页面的顶部，但是click事件不可以监听组件，需加上native表示实现原生属性才可以直接在组件上实现点击事件 -->
        <back-top 
            @click.native="backTopClick"
            v-show="isShowBackTop"
        />
    </div>
</template>

<script>
// 导入公共组件
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goodsList/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

// 导入首页中的子组件
import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

// 导入网络请求的相关组件
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from '@/common/utils'
import { itemListenerMixin } from 'common/mixin'

export default {
    name: 'Home',
    components: {
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
        HomeSwiper,
        RecommendView,
        FeatureView
    },
    mixins: [itemListenerMixin],
    created () {
        // 页面创建时，立马调用方法获取数据
        this.getHomeMultidata()

        // 获取首页商品列表,首页有三种类型的商品都获取过来
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
    mounted () {
        // 应该将这个功能放在mounted中，因为想通过this.$refs，如果放在created()中组件还没挂载，不一定拿得到
        // 监听商品列表中的图片是否加载完成：绑定goodListItem发送过来的图片加载事件
        /* this.$bus.$on('itemImageLoad', () => {
            // 调用Scroll中的refresh()
            this.$refs.scroll.refresh()
            console.log('-----------');
        }) */

        // 改用防抖函数，不让refresh加载那么频繁
        // 将refresh设置防抖
        // const refresh = this.debounce(this.$refs.scroll.refresh, 200)

        /* 设置了混入，取消了这些重复代码
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.$bus.$on('itemImageLoad', () => {
            // 调用了设置了防抖的refresh
            console.log('=========');
            refresh()
        })
        */
    },
    activated () {
        // 在路由组件重新切换回来时触发这个钩子

        // 在组件切换回来时，让首页停留在上次离开的位置
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        // 最好在回来时，能刷新一下避免better-scroll中有些bug
        this.$refs.scroll.refresh()
    },
    deactivated () {
        // 在路由组件切走时触发这个钩子
        
        // 当组件切走时，保存组件浏览到的一个位置信息saveY
        this.saveY = this.$refs.scroll.getScrollY()
        console.log(this.saveY);

        // 2 第二种方式，就是在切走home组件的时候，就取消对itemImageLoad的监听 this.$bus.$off('方法名', 回调函数)

        // 对监听事件进行保存
        this.itemImgListener = () => {
            // 调用设置了防抖的刷新函数
            refresh()
        }
        this.$bus.$off('itemImageLoad', this.itemImgListener)
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
            currentType: 'pop',

            // 是否显示backTop
            isShowBackTop: false,

            // tabControll的offsetTop
            tabOffsetTop: 0,

            // tabControll是否固定
            isTabControllFixed: false,

            // 组件在首页的位置信息
            saveY: 0
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
            // 设置多出来的一个tabControll也要让index保持一致，才能实现切换自如
            // tabControll组件中有一个currtentIndex属性，记录了当前哪个tab被选中的索引
            this.$refs.tabControll1.currentIndex = index
            this.$refs.tabControll2.currentIndex = index
        },

        // 实现点击backTop之后回到页面顶部
        backTopClick () {
            // 直接调用Scroll组件中定义好的回调顶部的方法scrollTo()
            this.$refs.scroll.scrollTo(0, 0)
        },

        // 设置backTop的显示与隐藏; 以及设置tabControll的吸顶效果
        contentScroll (position) {
            // 当位置超过1000时显示，否则隐藏
            // 因为position.y的值是负数的，所以要先取它的相反数来计算
            this.isShowBackTop = (-position.y) > 1000

            // 设置tabControll的吸顶
            // 如果滚动到某个位置，tabControll就吸顶
            // 但是这种方式对better-scroll框架没用，所以只能复制多一个tabControll组件，然后控制这2个组件的出现和消失的时机
            this.isTabControllFixed = (-position.y) > this.tabOffsetTop
        },

        // 实现上拉加载更多
        loadMore () {
            // 直接调用获取不同商品类型的数据的方法即可
            this.getHomeGoods(this.currentType)

        },

        // 定义一个防抖函数
        // 不要让图片没加载一次就调用一次refresh()，这样让这个方法调用得太频繁了，会对服务器造成压力。所以设置防抖函数，每加载一次图片，就等一会再加载一次，可以设置先等待100或者500ms,再发送请求，这样就可以减少refresh的请求次数
        /*
        debounce (fun, delay) {
            // fun是传入的需要设置防抖的函数，delay是防抖的时间
            let timer = null
            return function (...args) {
                // ...args因为传入的参数可能不止一个

                /*
                 如果已经存在了一个定时器就将这个定时器给清除掉.
                 比如说第一次加载图片时，这个时候定时器timer = null 所以不用清除；
                 第二次加加载图片时，有可能是还没到delay的的时间结束，所以就直接将timer清除掉，这样就会继续进入setTimeout进行等待，这样就可以实现防抖，不会每加载一次图片就请求一次refresh
                */
               /*
                if (timer) clearTimeout(timer)
                // 设置一个定时器
                timer = setTimeout(() => {
                    // 调用传入的需要设置防抖的函数
                    fun.apply(this, args)
                }, delay)
            }
        },
        */

        // 监听首页轮播图加载完后计算tabControll的offsetTop
        swiperImageLoad () {
            // 获取tabControll组件的offsetTop值
            /* 获取offsetTop后，当首页滚动到这里，就让tabControll位置固定
                要获取组件中的某个属性，可以通过$el来获取
                当有图片时，图片是异步加载的，所以如果没有图片加载后获取offsetTop得出来的高度是不包含图片的，这里图片加载最慢的一般是轮播图的，所以直接监听轮播图加载完后计算高度
            */
            // console.log(this.$refs.tabControll.$el.offsetTop);
            this.tabOffsetTop = this.$refs.tabControll2.$el.offsetTop
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

                // 实现可以重复上拉加载更多的功能
                this.$refs.scroll.finishPullUp()

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
    /* padding-top: 44px; */
    
    /* 设置整个首页的高度为相对高度，用vh来做单位，表示相对视口的高度，不然的话home的实际高度就不是视口高度，而是会被首页中所有加载出来的内容的高度总和 */
    height: 100vh;
    /* 子绝父相 */
    position: relative;
}

.home-nav {
    background-color: var(--color-tint);
    /* 设置字体颜色 */
    color: #fff;

    /* 设置导航栏是固定在页面上方的: 一开始设置这个是为了不让导航跟着原先浏览器的滚动而滚动，但现在因为下面的内容已经被better-scroll包裹了，所以上方的导航不用做特殊处理了*/
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1; */
}

/* 让控制栏在页面到达某个位置时就固定 */
.tab-control {
    /* 这些没有效果 */
    /* position: sticky; */
    /* 当页面滑动超过这个高度就会变成固定定位 */
    /* top: 44px; 
    z-index: 9; */
    position: relative;
    z-index: 9;
}

/* 改用另一种方式: 动态设置样式 */
.fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
}

/* 设置需要滚动的区域的高度 */
.scroll-content {
    /* 要设置动态的：首页需要滚动的区域只有中间，上方的导航栏固定了44px,下方的切换栏固定了49px，所以只有首页的视口高度减去这上下两个高度的中间部分需要滚动*/
    /* height: calc(100% - 97px);
    overflow: hidden;
    margin-top: 51px; */

    /* 另一种方法: 直接将中间设置为绝对定位，然后设置定位距离顶部和底部的距离即可 */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>