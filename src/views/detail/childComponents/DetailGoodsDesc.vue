<template>
    <!-- Vue是异步请求，页面渲染的时候，这里还不一定拿到数据了，如果还没拿到数据，那么就会是空的，直接显示就有可能报错，所以需要进行判断一下 -->
    <div class="goods-desc" v-if="Object.keys(goods).length !== 0">
        <!-- 标题信息 -->
        <div class="goods-title">{{goods.title}}</div>

        <!-- 价格信息 -->
        <div class="goods-price">
            <!-- 1.现价 -->
            <span class="goods-new-price">{{goods.newPrice}}</span>
            <!-- 2.旧价 -->
            <span class="goods-old-price">{{ goods.oldPrice }}</span>
            <!-- 3.折扣价：有些有，有些没有, 有的话才显示 -->
            <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
        </div>

        <!-- 数据信息 -->
        <div class="goods-other">
            <span>{{ goods.columns[0]}}</span>
            <span>{{ goods.columns[1] }}</span>
            <span>{{ goods.services[goods.services.length-1].name }}</span>
        </div>

        <!-- 服务信息 -->
        <div class="goods-service">
            <!-- 每一项都包含icon 和 name -->
            <!-- 有多项，只需要前面三项的元素，因为最后一项上面已经用了-->
            <span class="goods-service-item" v-for="index in goods.services.length - 1" :key="index">
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{ goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsDesc',
    props: {
        goods: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style scoped>
.goods-desc {
    margin-top: 15px;
    padding: 0px 8px;
    color: #999;
    /* 设置一条下边框 */
    border-bottom: 5px solid #f2f5f8;
}

.goods-title {
    font-size: 16px;
    color: #111;
}

.goods-price {
    margin-top: 10px;
}
.goods-new-price {
    font-size: 25px;
    color: var(--color-high-text);
}
.goods-old-price {
    padding: 5px;
    font-size: 13px;
    text-decoration: line-through;
} 
.discount {
    font-size: 12px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    padding: 2px 5px;

    /* 让元素上浮: 使用相对定位*/
    position: relative;
    /* 上浮到的位置 */
    top: -9px
}
.goods-other {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    /* 设置一条下边框 */
    border-bottom: 1px solid rgba(100,100,100,.1);
    /* 让文字垂直居中 */
    line-height: 30px;
} 
.goods-service {
    /* margin-top: 15px; */
    line-height: 60px;
    display: flex;
    justify-content: space-between;
}
.goods-service span {
    /* flex: 1; 设置了这个每个的占位会相同，但是有的字会比较多，就会变成两行*/
    font-size: 13px;
}
.goods-service img {
    width: 14px;
    height: 14px;
    /* 设置icon的位置 */
    position: relative;
    top: 2px;
}
</style>