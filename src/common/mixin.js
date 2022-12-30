// 把组件中的重复代码，给放在这个文件中

// 导入防抖函数
import { debounce } from './utils'
// 导入BackTop组件
import BackTop from '@/components/content/backTop/BackTop'

// 封装图片监听的代码
export const itemListenerMixin = {
    data () {
        return {
            itemImgListener: null
        }
    },
    mounted () {
        // 定义监听图片的刷新函数 
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener) 
        console.log('mixin');
    }
}

// 封装回到顶部的backTop的代码
export const backTopMixin = {
    data () {
        return {
            // 是否显示backTop
            isShowBackTop: false,
        }
    },
    components: {
        BackTop,
    },
    methods: {
        // 实现点击backTop之后回到页面顶部
        backTopClick () {
            // 直接调用Scroll组件中定义好的回调顶部的方法scrollTo()
            this.$refs.scroll.scrollTo(0, 0)
        },
    }
}