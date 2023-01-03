<template>
    <div class="toast" v-show="isShow">
        <div>
            <!-- 显示弹窗内容 -->
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    // 要将这个组件设置为一个插件，所以可以在这个组件中定义一个方法，然后其他引入这个组件的可以直接调用这个Toast组件中定义的方法来实现功能
    data () {
        return {
            // toast弹窗默认显示的信息
            message: '',
            // 弹窗是否显示
            isShow: false
        }
    },
    methods: {
        // 定义一个实现toast弹窗的业务逻辑方法
        show (message, duration=2000) {
            // message: toast弹窗显示的信息, 外部调用这个方法时传入的信息; duration: 弹窗持续的时间

            // 给弹窗信息赋值
            this.message = message
            // 显示弹窗
            this.isShow = true 
            // 弹窗不可能一直显示，而是显示一会就消失，所以要设置一个定时器来设置弹窗的显示时长
            setTimeout (() => {
                // 弹窗消失时将消息先置空
                this.message = ''
                // 弹窗消失
                this.isShow = false
            }, duration) 
        }
    }
}
</script>

<style scoped>
.toast {
    position: fixed;
    /* 设置弹窗在页面中间 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 设置弹窗的背景色 */
    background-color: rgba(0,0,0,.6);
    color: #fff;
    padding: 5px 8px;
    /* 让它在页面的最上方 */
    z-index: 111;
}
</style>