<template>
    <div class="bottom-bar">
        <!-- 全选按钮 -->
        <div class="bottom-check">
            <check-button 
                class="check-button" 
                @click.native="checkAll"
                :is-check="isSelectAll"
            ></check-button>
            <span>全选</span>
        </div>

        <!-- 商品合计数量 -->
        <div class="bottom-count">
           合计：{{ totalPrice }}
        </div>

        <!-- 计算按钮 -->
        <div class="bottom-calc" @click="calcClick">
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

        // 设置全选按钮默认的选中状态
        // 如果购物车中一件商品都没有，默认不选中；如果购物车中有一个没选中的，全选按钮就不能为勾选状态
        isSelectAll () {
            if (this.cartList.length === 0) {
                // 购物车为空，全选按钮不勾选
                return false
            }
            // 否则如果购物车有商品，那么我们都是默认加入购物车中的商品都是勾选的，也就是购物车有商品就默认设置为全选true
            // !item.checked: 表示有没勾选的，
            // this.cartList.filter(item => !item.checked).length 表示没勾选的有长度，也就是有未勾选的
            // 那么对未勾选的取反,就是为true, 而我们就是要设置全选按钮的默认状态为true

            // 方法1: 使用filter过滤
            return !(this.cartList.filter(item => !item.checked).length)

            // 方法2: 使用find查找, 只要找到有一个false,那么就是false,取反就是true了
            // return !(this.cartList.find(item => !item.checked))

            // 方法3: 使用普通for遍历数组,只要有false就返回false,否则返回true
            // for (let item of this.cartList) {
            //     if(!item.checked) {
            //         // 有未勾选的
            //         return false
            //     }
            // }
            // return true

        }

    },
    methods: {
        // 实现全选按钮的功能
        checkAll () {
            if (this.isSelectAll) {
                // 如果是全选的就设置为全不选,遍历数组中的元素,将选中状态设置为false即可
                this.cartList.forEach(item => item.checked = false) 
            } else {
                // 如果为全不选或者有部分选中而已,则点击全选之后为全选中
                this.cartList.forEach(item => item.checked = true)
            }
        },

        // 当购物车没商品时，点击去计算弹出提示框
        calcClick () {
            if (!this.isSelectAll) {
                // 如果全选按钮为false，也就是购物车中无商品
                this.$toast.show('请选择购买的商品', 1000)
            }
        }
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
    /* 设置check-button里面设置内嵌的图片 */
    width: 20px;
    height: 20px;
    line-height: 18px;
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