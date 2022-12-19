<template>
    <div class="tab-control">
        <!-- 这个组件中只是文件内容有所变化，比较简单，所以直接在组件中进行设置就可以了，不用专门去设置插槽 -->

        <!-- 直接接受父组件传递过来的元素，进行遍历显示标题文字 -->
        <!-- 这个控制栏还要实现，点击到谁，谁的文字标题就变色并且显示下划线，默认选中第一个, 通过动态样式来实现变化 -->
        <div 
            class="tab-control-item" 
            v-for="(item, index) in titles"
            :class="{active: currentIndex === index}"
            @click="itemClick(index)"
        >
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        // 接收父组件传递过来的控制栏要显示的文字标题
        titles: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            // 用来记录选中了控制栏中的第几项，默认选中第一项，用数组元素的index来记录
            currentIndex: 0,
        }
    },
    methods: {
        // 当点击控制栏的文字标题时，实现样式的变化
        itemClick (index) {
            // 就是将选中元素给取出来，将它的index来作为标识即可实现
            // 当前的索引就会变成点击的那个元素索引
            this.currentIndex = index;
            // 点击之后将index传递给home组件，home组件去绑定这个时间tabClick
            this.$emit('tabClick',index)
            console.log(index);
        }
    }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    z-index: 9;
}

.tab-control-item {
    flex: 1;
}

.tab-control-item span {
    padding: 5px;
}

/* 设置动态样式 */
.active {
    color: var(--color-high-text);
}
/* 文字标题下方加下划线 */
.active span {
    border-bottom: 3px solid var(--color-high-text);
}

</style>