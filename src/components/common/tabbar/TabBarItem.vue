<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- item项也不能写死，也是得抽取封装，因为每个item中的图标和标题都是要设置为动态的，可以让后面在别的项目可以直接修改的 -->

        <!-- 判断当前是处于激活还是未激活的状态，激活就是显示激活的图片, 同时点击某个item时，该item跳转到激活状态, 然后加载该item项对应的页面，所以当点击item时要和对应的路由联系起来-->

        <!-- 放未激活时的图标 false显示-->
        <div class="itme-icon" v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        
        <!-- 放激活时的图标 true显示-->
        <div class="item-active-icon" v-else>
            <slot name="item-active-icon"></slot>
        </div>
        
        <!-- 放图标的标题 -->
        <div class="item-text" :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    // data () {
    //     return {
    //         isActive: false,
    //     }
    // },
    props: {
        // 接收传递过来的path路由路径参数
        path: {
            type: String,
            required: true
        },
        // 接收传递过来的激活状态时要显示的颜色
        activeColor: {
            type: String,
            // 如果父元素没有传过来值时，激活状态就显示这个值
            default: '#ff5777'
        }
    },
    methods: {
        itemClick () {
            // 点击item项的时候跳转到对应的路由界面
            this.$router.replace(this.path)
        }
    },
    computed: {
        // 当点击某个item的时候，只有被点击的item项才显示激活的状态和显示对应状态的颜色
        isActive () {
            // 通过判断当前item的路由是否含有对应该item项传递过来的路由路径，如果包含的，就证明是点击了该item项，要点击该item项进行跳转的
            // 如果不等于-1就是表示包含
            return this.$route.path.indexOf(this.path) !== -1
        },

        // 设置动态样式，可以来显示激活状态时的item-text的颜色
        activeStyle () {
            // 可以通过this.isActive来判断当前是否是激活的，激活就显示激活时的样式，为激活就不改变样式
            return this.isActive ? {color: this.activeColor} : {}
        }
    }
}
</script>

<style scoped>
.tab-bar {
    display: flex;
}
.tab-bar-item {
    /* 让每个item项独占一份，这样它们就会均分了 */
    flex: 1;
    font-size: 14px;
}

/* 使用新的具名插槽之后，原来的img样式不能渲染在页面，而在外层的样式能被渲染

解决：在css样式中，在img名字前面加/deep/做样式穿透 */
.tab-bar-item /deep/img {
    width: 24px;
    height: 24px;
    /* 去除移动端中图片固有的3px像素 */
    vertical-align: middle;
    /* 图片距离顶部的距离 */
    margin-top: 5px;
}
</style>