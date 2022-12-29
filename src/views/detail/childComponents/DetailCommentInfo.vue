<template>
    <div class="detail-comment-info" v-if="Object.keys(commentInfo).length !== 0">
        <!-- 评论介绍信息 -->
        <div class="comment-title">
            <span class="comment-title-left">用户评价</span>
            <span class="comment-title-right">更多</span>
        </div>

        <!-- 主要评论内容 -->
        <div class="comment-info">
            <!-- 用户信息 -->
            <div class="comment-info-user">
                <img :src="commentInfo.user.avatar" alt="">
                <span>{{commentInfo.user.uname}}</span>
            </div>

            <!-- 评论内容 -->
            <div class="comment-info-content">
                <div class="content">{{commentInfo.content}}</div>
                <p class="content-info">
                    <!-- 对时间戳进行格式化处理 -->
                    {{ commentInfo.created | showDate}} {{ commentInfo.style }}
                </p>
            </div>

            <!-- 解释的内容，如果有的话就显示 -->
            <div class="shop-reply" v-if="commentInfo.explaiin != null">
                {{ commentInfo.explain }}
            </div>

            <!-- 评论图片: 如果有的话就显示 -->
            <div class="comment-img" v-if="commentInfo.images != null">
                <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :key="index">
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from 'common/utils'

export default {
    name: 'DetailCommentInfo',
    props: {
        commentInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    filters: {
        showDate (value) {
            // 将时间转化为Date对象
            const date = new Date(value * 1000)
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        }
    }
}
</script>

<style scoped>
.detail-comment-info {
    padding: 20px 10px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
}
.comment-title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    font-size: 13px;
}

.comment-title-left {
    float: left;
}
.comment-title-right {
    float: right;
}
.comment-title-right::after {
    content: "";
    background: url("~assets/img/detail/right_arrow.svg") 0 0/1.06rem 1.06rem;
    display: inline-block;
    position: relative;
    top: 0.26rem;
    width: 1.06rem;
    height: 1.06rem;
}
.comment-info {
    margin-top: 10px;
}
.comment-info-user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.comment-info-user span {
    position: relative;
    font-size: 10px;
    top: -15px;
    margin-left: 10px;
}
.comment-info-content {
    padding: 0 5px 15px;
    font-size: 14px;
    color: #777;
    line-height: 1.5;
}

.content-info {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
}
.comment-img img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
</style>