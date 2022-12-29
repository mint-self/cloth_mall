// 把组件中的重复代码，给放在这个文件中

// 导入防抖函数
import { debounce } from './utils'

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