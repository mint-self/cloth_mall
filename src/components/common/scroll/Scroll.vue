<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <!-- 放入一个插槽可以从外部插入许多标签 -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
// 导入滚动插件
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    data () {
        return {
            // 存放滚动的实例
            scroll: null,
        }
    },
    props: {
        // 监听滚动事件的参数
        probeType: {
            type: Number,
            default: 0
        },

        // 监听上拉事件的参数
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    updated () {
        // 创建滚动实例,传入需要设置滚动的组件或标签, 用ref来获取才是唯一的，如果通过类名，有可能不同组件有类名相同的情况
        this.scroll = new BScroll(this.$refs.wrapper, {
            // 设置实时监听滚动的位置
            probeType: this.probeType,
            // 监听上拉事件
            pullUpLoad: this.pullUpLoad
        })

        // 一开始画面先不要有滚动距离，就是显示在顶部
        this.scroll.scrollTo(0, 0)

        // 监听滚动的位置, 是onscroll方法，参数position就是位置参数
        this.scroll.on('scroll', (position) => {
            // console.log(position);
            // 将监听到的滚动位置信息发送给home组件
            this.$emit('scroll', position)
        })

        // 监听上拉事件，将这个方法传递给home组件
        this.scroll.on('pullingUp', () => {
            // 将这个事件传递出去
            this.$emit('pullingUp')
        })
    },
    methods: {
        // 定义一个回调页面顶部的方法
        scrollTo (x, y, time=300) {
            // 在自定义的方法中去调用滚动框架中自带的回到页面顶部的scrollTo()方法来实现功能
            this.scroll.scrollTo(x, y, time)
        },

        // 如果不调用finishPullUp()方法，就只会调用一次上拉加载，所以要设置每次上拉时都能实现上拉加载
        finishPullUp () {
            // 在自定义的方法中去调用滚动框架中自带finishPullUp()
            this.scroll.finishPullUp()
        }
    }
}
</script>

<style scoped>
.wrapper {
    overflow: hidden;
}
</style>