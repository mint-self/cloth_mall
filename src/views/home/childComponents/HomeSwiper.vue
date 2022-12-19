<template>
    <!-- 要尽可能的使得每个功能组件化，所以要将每个功能独立为一个组件，然后在大的组件中去引入 -->
    <div class="home-swiper">
        <!-- 首页顶部的轮播图 -->
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
// 导入轮播图组件
import {Swiper, SwiperItem} from '@/components/common/swiper'
export default {
    name: 'HomeSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        // 接受home父组件传递过来的轮播图数据
        banners: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style scoped></style>