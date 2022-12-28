<template>
    <div class="nav-bar">
        <nav-bar>
            <div slot="left" class="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>

            <div slot="center" class="center">
                <div 
                    v-for="(item, index) in title" :key="index"
                    class="center-item"
                    :class="{active: currentIndex === index}"
                    @click="titleClick(index)"
                >
                    <span>{{item}}</span>
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';

export default {
    name: 'DetailNavBar',
    components: {
        NavBar,
    },
    data () {
        return {
            // 存放顶部导航栏的标题
            title: ['商品', '参数', '评论', '推荐'],

            // 当前的index
            currentIndex: 0,
        }
    },
    methods: {
        // 点击每项item时，将点击的item的index赋值为当前的index
        titleClick (index) {
            this.currentIndex = index
        },

        // 点击之后返回到首页
        backClick () {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
.left img{
    margin-top: 11px;
}

.center {
    display: flex;
    font-size: 13px;
}

.center-item {
    flex: 1;
}

/* 设置动态样式 */
.active {
    color: var(--color-high-text);
}
</style>