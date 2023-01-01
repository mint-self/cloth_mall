// 导入需要用到的常量
import {
    ADD_COUNT,
    ADD_TO_CART
} from './mutation-type'

export default {
    /*
     // 添加/修改购物车中商品的数量
     addCount (state, payload) {
        payload.count++
    },
    // 将商品添加到购物车
    addToCart (state, payload) {
        state.cartList.push(payload)
    }
    */

    // 注意格式：有些常量用大写
    // 添加/修改购物车中商品的数量
    [ADD_COUNT](state, payload) {
        payload.count++
    },

    // 将商品添加到购物车
    [ADD_TO_CART](state, payload) {
        // 商品加入购物车时,设置商品的选中状态,默认加入购物车,状态为选中
        payload.checked = true
        state.cartList.push(payload)
    }

}