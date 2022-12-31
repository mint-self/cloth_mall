// 导入常量
import {
    ADD_COUNT,
    ADD_TO_CART
} from './mutation-type'

export default {
     // 定义一个将商品添加到购物车的方法
     addCart (context, payload) {
        // 判断是否是旧商品
        let oldProduct = null
        for (let item of context.state.cartList) {
            if (item.iid === payload.iid) {
                // 旧商品
                oldProduct = item
            }
        }

        // 旧商品数量加1，新商品添加对象，数量为1
        if (oldProduct) {
            // oldProduct.count += 1
            // 调用mutations中的方法修改数量
            // 这里的方法不用加上单引号了
            // context.commit('ADD_COUNT',oldProduct)
            context.commit(ADD_COUNT, oldProduct)
        } else {
            payload.count = 1
            // context.state.cartList.push(payload)
            // 将商品添加到购物车
            context.commit(ADD_TO_CART, payload)
        }
    }
}