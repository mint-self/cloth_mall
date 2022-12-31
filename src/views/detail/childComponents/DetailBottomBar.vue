<template>
    <div class="bottom-bar">
        <!--左边 -->
        <div class="bottom-left">
            <!-- 客服 -->
            <div class="service">
                <i class="icon"></i>
                <span>客服</span>
            </div>

            <!-- 店铺 -->
            <div class="shop">
                <i class="icon"></i>
                <span>店铺</span>
            </div>

            <!-- 收藏 -->
            <div class="collect">
                <i class="icon"></i>
                <span>收藏</span>
            </div>
        </div>

        <!-- 右边 -->
        <div class="bottom-right">
            <!-- 加入购物车 -->
            <div class="cart" @click="addCart">加入购物车</div>

            <!-- 购买 -->
            <div class="buy">购买</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailBottomBar',
    methods: {
        addCart () {
            // 具体的实现逻辑在detail中实现，因为具体的商品在那里才可以拿
            this.$emit('addCart')
        }
    }
}
</script>

<style scoped>
.bottom-bar {
    height: 49px;
    background-color: #fff;
    /* 可以用固定定位来设置 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
   

    /* 也可以用相对定位 */
    /* position: relative;
    bottom: 49px;
    z-index: 10; */

    display: flex;
    text-align: center;
    font-size: 12px;
} 
.bottom-left, .bottom-right {
    flex: 1;
    display: flex;
}
.bottom-left div {
    flex: 1;
    border-right: 1px solid rgba(128, 128, 128, 0.2);
}
.bottom-right div {
    flex: 1;
    line-height: 49px;
}
.bottom-left .icon {
    display: block;
    background: url('~assets/img/detail/detail_bottom.png') 0 0 / 100%;
    width: 22px;
    height: 22px;
    margin: 5px auto -2px;
}
/* 设置各自精灵图的位置 */
.bottom-left .service .icon{
    background-position: 0 -54px;
}
.bottom-left .shop .icon{
    background-position: 0 -98px;
}
.bottom-right .cart {
    background-color: #ffe817;
    color: #333;
}
.bottom-right .buy {
    background-color: var(--color-tint);
    color: #fff;
}
</style>