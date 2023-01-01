<template>
    <div class="check-button" :class="{active: isCheck}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
    name: 'CheckButton',
    props: {
        isCheck: {
            type: Boolean,
            default () {
                return false
            }
        }
    }
}
</script>

<style scoped>
.check-button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    /* 设置一条外边框线 */
    border: 2px solid #aaa;
}
/* 设置动态样式,点击之后变颜色 */
.active {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
}
</style>