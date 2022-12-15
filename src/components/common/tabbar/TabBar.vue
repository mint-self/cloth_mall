<template>
    <div class="tab-bar">
        <!-- 为了使得这个组件足够组件化，可以随时使用，所以得进行封装处理，这里使用插槽来通过外部向这个组件进行插入 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>

<style scoped>
.tab-bar {
    background-color: #f6f6f6;
    /* 使用flex布局 */
    display: flex;
    text-align: center;
    
    /* 让导航栏固定到页面的底部 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 设置导航栏高度 */
    height: 49px;
    /* 设置盒子的上方阴影 */
    box-shadow: 0 -1px 1px rgb(100,100,100, .1);
    border-top: 1px solid #eee;
}
</style>