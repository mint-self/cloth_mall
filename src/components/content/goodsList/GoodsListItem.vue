<template>
    <div class="goods-list-item" @click="itemClick">
        <!-- 商品图片 -->
        <img :src="goodsListItem.show.img" alt="" @load="imageLoad">
        <!-- 商品的相关信息 -->
        <div class="goods-info">
            <!-- 商品信息描述 -->
            <p>{{goodsListItem.title}}</p>
            <!-- 商品价格 -->
            <span class="price">{{goodsListItem.price}}</span>
            <!-- 商品收藏数量 -->
            <span class="collect">{{goodsListItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props: {
        // 接受父组件传递过来的每个商品数据项
        goodsListItem: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    methods: {
        // 监听图片的加载，当图片加载完成之后，就要去调用Scroll组件中的refresh()方法，这样就可以解决better-scroll的高度bug问题
        imageLoad () {
            // console.log("image");
            // 发送图片加载事件给home组件,然后让home组件去调用Scroll组件中的refresh()
            this.$bus.$emit('itemImageLoad')
        },

        // 点击任意一个item项就会跳转到商品的详情页
        itemClick () {
            // 跳转的商品的详情页时，要将对应商品的iid携带过去，以便查询对应数据，iid就存放在每个item项中，从中获取即可
            this.$router.push('/detail/' + this.goodsListItem.iid)
        }
    }
}
</script>

<style scoped>
.goods-list-item {
   position: relative;
   /* 让每行显示2个商品，所以每个item应该占一半，但是要有缝隙，所以不直接写50%*/
   width: 48%;
   /* 设置整个item的高度*/
   padding-bottom: 40px;
}
.goods-list-item img {
    width: 100%;
    /* 圆角显示 */
    border-radius: 5px;
}
/* 商品信息样式设置 */
.goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
/* 设置文字超过就省略号显示 */
.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}

.goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
}
/* 插入收藏的图片 */
.goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /* 插入图片 */
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

.goods-info .collect {
   position: relative;
 }
</style>