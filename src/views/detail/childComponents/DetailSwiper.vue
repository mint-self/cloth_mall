<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'

export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        // 轮播图数据
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.detail-swiper {
    height: 270px;
}
</style>