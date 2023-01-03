<template>
    <div class="nav-bar ignore">
        <!-- 封装顶部导航栏组件：顶部导航栏一般是分3个部分的，左中右，每个部分分别可以插入不同的东西，所以就可以在一个大的盒子中去插入三个插槽，从而可以实现像这三个插槽分别插入不同的东西-->
        <div class="left">
            <slot name="left"></slot>
        </div>

        <div class="center">
            <slot name="center"></slot>
        </div>

        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
.nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    /* 设置字体都居中显示 */
    text-align: center;
    /* 设置盒子的下方阴影 */
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}
.left, .right {
    width: 60px;
    /* background-color: blue; */
}
.center {
    flex: 1;
    /* background-color: pink; */
}
</style>