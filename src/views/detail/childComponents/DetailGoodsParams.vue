<template>
    <div class="detail-params" v-if="Object.keys(paramsInfo).length !== 0">
        <!-- 商品尺码表格 -->
        <table class="params-sizes" v-for="(table, index) in paramsInfo.sizes" :key="index" >
            <tr v-for="(tr, indey) in table" :key="indey" v-if="tr[1] != '-'">
                <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
            </tr>
        </table>

        <!-- 商品参数信息表格 -->
        <table class="params-infos">
            <tr v-for="(item, index) in paramsInfo.infos" :key="index">
                <td class="params-infos-key">{{item.key}}</td>
                <td class="params-infos-value">{{item.value}}</td>
            </tr>
        </table>

        <!-- 底部图片的展示: 不一定有，有的话才显示-->
        <div class="params-img" v-if="paramsInfo.image != ''">
            <img :src="paramsInfo.image" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsParams',
    props: {
        // 商品参数信息
        paramsInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style scoped>
.detail-params {
    padding: 20px 40px;
    font-size: 14px;
    /* 设置一条下边框线 */
    border-bottom: 5px solid #f2f5f8;
}

/* 对表格，行，单元格做统一的设置 */
.detail-params table {
    width: 100%;
    /* 表格边框线合并 */
    border-collapse: collapse;
}
.detail-params table tr {
    /* 设置每行的高度 */
    height: 42px;
}
.detail-params table tr td {
    /* 设置每个单元格有一条下框线 */
    border-bottom: 1px solid rgba(100,100,100,.1);
}

.params-infos {
    /* 设置一条上边框 */
    border-top: 1px solid rgba(0,0,0,.1);
}
.params-infos-key {
    /* 当右边的value的数据比较多时，会挤压到key，所以直接给key一个固定的宽度 */
    width: 90px;
}
.params-infos-value {
    color: var(--color-high-text);
}
.params-img img {
    width: 100%;
}
</style>