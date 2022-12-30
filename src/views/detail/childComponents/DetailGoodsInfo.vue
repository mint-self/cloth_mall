<template>
    <div class="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
        <!-- 商品描述信息 -->
        <div class="goods-info-desc">
            <!-- 上信息装饰线 -->
            <div class="desc-line" style="float: left;">
                <i class="desc-dot"></i>
            </div>
            <!-- 描述信息 -->
            <div class="desc-text">{{detailInfo.desc}}</div>
            <!-- 下信息装饰线 -->
            <div class="desc-line" style="float: right;">
                <i class="desc-dot"></i>
            </div>
        </div>

        <!-- 商品图片介绍标题 -->
        <div class="goods-info-key">
            {{detailInfo.detailImage[0].key}}
        </div>

        <!-- 商品穿着图片 -->
        <div class="goods-info-imgs">
            <img 
                :src="item" 
                alt="" 
                v-for="(item, index) in detailInfo.detailImage[0].list"
                :key="index"
                @load="imgLoad"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsInfo',
    props: {
        // 接收传递过来的商品细节信息
        detailInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            // 存放图片的张数
            imageLength: 0,

            // 计算图片加载张数的计数器，图片每加载一张就加1
            counter: 0,
        }
    },
    methods: {
        // 监听图片的加载
        imgLoad () {
            // 因为有多张图片，直接等到最后一张图片加载完成后再发送事件。
            // 计算图片的张数方法：定义一个计数器counter,每加载一张图片counter就加1，当counter的次数和存放图片的数组中的图片张数相等时，就是图片都加载完成了
            
            // 加载一次就加1
            ++this.counter 
            if (this.counter === this.imageLength) {
                // 表示图片加载完成了
                this.$emit('imgLoad')
                console.log('goodsinfoimg');
            }
            // console.log('counter' + this.counter);
            // console.log(this.imageLength);
        }
    },
    watch: {
        // 监听图片的张数
        // 注意：这里的watch是要监听的是detailInfo中的数据，所以必须detailInfo(){} 而不能自己随便起个方法名，这里不是方法名，而是要监听的数据
        detailInfo () {
            // 计算出图片的张数
            this.imageLength = this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>

<style scoped>
.detail-goods-info {
    font-size: 12px;
}
.goods-info-desc {
    font-size: 0.6rem;
    padding: 0.42rem 0.34rem;
}
.desc-line {
    width: 3.5rem;
    height: 0.04rem;
    background-color: gray;
    position: relative;
}
.desc-dot {
    position: absolute;
    top: -0.1rem;
    display: inline-block;
    width: 0.21rem;
    height: 0.21rem;
    background-color: black;
    border-radius: 50%;
}
.desc-text {
    padding: 0.85rem 0;
    color: gray;
}
.goods-info-key {
    padding: 10px 8px;
}
.goods-info-imgs img {
    width: 100%;
}
</style>