<template>
    <div class="back-top">
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
export default {
    name: 'BackTop'
}
</script>

<style scoped>
.back-top {
    /* 固定在页面的某个位置 */
    position: fixed;
    right: 8px;
    bottom: 60px;
    z-index: 1;
}

/* 设置图标的大小 */
.back-top img {
    width: 43px;
}
</style>