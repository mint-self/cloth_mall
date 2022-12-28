<template>
    <div class="shop-info">
        <!-- 商店的logo 和 店名 -->
        <div class="shop-top">
            <img :src="shop.logo" alt="">
            <span>{{shop.name}}</span>
        </div>

        <!-- 商店信息中间部分 -->
        <div class="shop-middle">
            <!-- 左边数据信息 -->
            <div class="shop-middle-left">
                <!-- 销量 -->
                <div class="info-sells">
                    <!-- 对呈现的数据过滤一下再显示 -->
                    <div class="info-sells-count">{{shop.sells | sellCountFilter}}</div>
                    <div class="info-sells-text">总销量</div>
                </div>

                <!-- 宝贝销量 -->
                <div class="info-goods">
                    <div class="info-goods-count">{{ shop.goodsCount }}</div>
                    <div class="info-goods-text">全部宝贝</div>
                </div>
            </div>

            <!-- 右边商店信息 -->
            <div class="shop-middle-right">
                <!-- 用一个表格来呈现 -->
                <table>
                    <!-- 有3行，每行里面有3个单元格，来呈现3个不同的内容 -->
                    <tr v-for="(item, index) in shop.score" :key="index">
                        <td>{{ item.name }}</td>
                        <td class="right-item-score" :class="{ 'item-score-active': item.isBetter }">{{ item.score }}</td>
                        <td class="right-item-better" :class="{ 'item-better-active': item.isBetter }">
                            <span>{{ item.isBetter ? '高' : '低' }}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- 底部商家按钮  -->
        <div class="shop-bottom">
            <div class="enter-shop">进店逛逛</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailShopInfo',
    props: {
        // 商家信息
        shop: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    // 设置一个过滤器，来对呈现的数据进行处理
    filters: {
        // 对总销量数据进行处理后再呈现
        sellCountFilter: function (value) {
            // 如果小于1万直接呈现
            if (value < 10000) return value
            // 大于1万，则以万为单位，只显示一位小数
            return (value / 10000).toFixed(1) + '万'

        }
    }
}
</script>

<style scoped>
.shop-info {
    padding: 20px 10px;
    /* 设置下边框 */
    border-bottom: 5px solid #f2f5f8;
}
.shop-top {
    /* 设置让元素垂直居中 */
    display: flex;
    align-items: center;
}
.shop-top img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
}
.shop-top span {
    /* font-size: 14px; */
    margin-left: 10px;
    /* vertical-align: center; */
}

.shop-middle {
    margin-top: 15px;
    display: flex;
    /* 元素垂直居中 */
    align-items: center;
}
.shop-middle-left, .shop-middle-right {
    flex: 1;
}
.shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    /* 设置一条右边框 */
    border-right: 1px solid rgba(0,0,0,.1);
}
.info-sells-count, .info-goods-count {
    font-size: 20px;
}
.info-sells-text, .info-goods-text {
    margin-top: 10px;
    font-size: 12px;
}
.shop-middle-right {
    font-size: 13px;
    color: #333;
}
.shop-middle-right table {
    /* 对整个表格整体进行设置 */
    margin-left: 30px;
    width: 120px;
}
.shop-middle-right table td {
    /* 设置单元格之间的距离 */
    padding: 5px 0;
}
/* 默认情况下显示绿色 */
.shop-middle-right .right-item-score {
    color: #5ea732;
}
.shop-middle-right .right-item-better span{
    background-color: #5ea732;
    color: #fff;
    text-align: center;
}
/* 设置动态样式，当动态样式的显示条件成立时就显示红色 */
.shop-middle-right .item-score-active {
    color: #f13e3a;
}
.shop-middle-right .item-better-active span{
    background-color: #f13e3a;
}

.shop-bottom {
    text-align: center;
    margin-top: 15px;
}
.enter-shop {
    font-size: 15px;
    background-color:  #f2f5f8;
    /* 设置这个背景色的宽高 */
    width: 150px;
    height: 30px;
    /* 转为行内块，才能让div设置text-align */
    display: inline-block;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
}
</style>