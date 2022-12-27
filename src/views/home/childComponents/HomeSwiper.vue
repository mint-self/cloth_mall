<template>
    <!-- 要尽可能的使得每个功能组件化，所以要将每个功能独立为一个组件，然后在大的组件中去引入 -->
    <div class="home-swiper">
        <!-- 首页顶部的轮播图 -->
        <swiper>
            <swiper-item v-for="item in banners" :key="item.image">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imageLoad">
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
    },
    data () {
        return {
            // 设置一个值，用来记录是否有一张图片已经加载出来了，有了就不用重复监听了
            isLoad: false,
        }
    },
    methods: {
        // 监听图片是否加载好
        imageLoad () {
            if (!this.isLoad) {
                // 将加载好的事件发送到home中，再home中去处理获取高度
                this.$emit('swiperImageLoad')
                // 将isLoad置为true，不用再重复监听了
                this.isLoad = true
            }
        }
    }
}
</script>

<style scoped></style>