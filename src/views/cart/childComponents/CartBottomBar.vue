<template>
    <div class="bottom-bar">
        <!-- 全选按钮 -->
        <div class="bottom-check">
            <check-button class="check-button"></check-button>
            <span>全选</span>
        </div>

        <!-- 商品合计数量 -->
        <div class="bottom-count">
           合计：{{ totalPrice }}
        </div>

        <!-- 计算按钮 -->
        <div class="bottom-calc">
            去计算：({{ totalCount }})
        </div>
    </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue';

import { mapGetters } from 'vuex';

export default {
    name: 'BottomBar',
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        // 计算勾选的总价格
        totalPrice () {
            // 总价格是计算出那些有勾选的，通过filter()来筛选出有勾选的，然后在再用reduce()来计算出遍历出来的元素总价,接着再通过toFixed()来保留2位小数
            return '￥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            }, 0).toFixed(2)
        },

        // 计算勾选的总数量
        totalCount () {
            // 总数量是已经勾选的，所以用filter来过滤出有勾选的，然后它的length就是了
            return this.cartList.filter(item => {
               return item.checked
            }).length
        },

    }
}
</script>

<style scoped>
.bottom-bar {
    height: 42px;
    line-height: 42px;
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    display: flex;
    font-size: 14px;
    text-align: center;
}
.bottom-check {
    display: flex;
    /* 垂直对齐 */
    align-items: center;
    margin-left: 5px;

} 
.check-button {
    margin-right: 5px;
}
.bottom-count {
    margin-left: 30px;
    flex: 1;
}
.bottom-calc {
    width: 100px;
    background-color: var(--color-tint);
    
}
</style>