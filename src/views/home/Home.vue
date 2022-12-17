<template>
    <div class="home">
        <!-- 顶部导航栏 -->
        <nav-bar class="home-nav">
            <!-- 在组件中通过向插槽中插入具体的内容，这里只向中间插入了东西，左右没有做距离的设置 -->
            <div slot="center">购物车</div>
        </nav-bar>

        <!-- 上面轮播图 -->
        <swiper>
            <swiper-item v-for="item in banners" :key="item.image">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'

import {getHomeMultidata} from 'network/home'
// 导入轮播图组件
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
    name: 'Home',
    components: {
        NavBar,
        Swiper,
        SwiperItem
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
.home-nav {
    background-color: var(--color-tint);
    /* 设置字体颜色 */
    color: #fff;
}
</style>