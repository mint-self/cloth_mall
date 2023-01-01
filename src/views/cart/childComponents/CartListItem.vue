<template>
    <div class="shop-item">
        <!-- 选择框 -->
        <div class="item-selector">
            <!-- 插入选择框的组件 -->
            <check-button 
                @click.native="checkClick"
                :is-check="itemInfo.checked" 
            ></check-button>
        </div>

        <!-- 商品图片 -->
        <div class="item-img">  
            <img :src="itemInfo.image" alt="">
        </div>

        <!-- 商品相关信息 -->
        <div class="item-info">
            <!-- 标题 -->
            <div class="item-title">{{ itemInfo.title }}</div>
            <!-- 介绍信息 -->
            <div class="item-desc">{{ itemInfo.desc }}</div>
            <!-- 底部信息 -->
            <div class="item-bottom">
                <!-- 左边价格 -->
                <div class="item-price left">￥{{ itemInfo.price }}</div>

                <!-- 右边数量 -->
                <div class="item-count right">x{{ itemInfo.count }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue';

export default {
    name: 'CartListItem',
    components: {
        CheckButton
    },
    props: {
        // 接收父级传递过来的每个商品项的数据
        itemInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    methods: {
        // 实现商品项选中按钮的选中与否的功能
        checkClick () {
            // 点击之后:选中的变为未选中,未选中的变为选中.所以就是直接取反
            // console.log('click');
            this.itemInfo.checked = !this.itemInfo.checked
        }
    }
}
</script>

<style scoped>
.shop-item {
    width: 100%;
    display: flex;
    padding: 10px;
    /* 设置下框线 */
    border-bottom: 1px solid #ccc;
}
.item-selector {
    width: 14%;
    display: flex;
    justify-content:center;
    align-items:center;
}
.item-img {
    padding: 5px;
}
.item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
}
.item-info {
    padding: 5px 10px;
    font-size: 17px;
    color: #333;
    /* 配合设置一行显示,超出用省略号 */
    overflow: hidden;
}
.item-title, .item-desc {
    /* 设置一行显示,超出用省略号 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}
.item-bottom {
    font-size: 15px;
    margin-top: 15px;
}
.item-bottom .item-price {
    color: orangered;
}
</style>