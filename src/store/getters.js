export default {
    // 计算购物车中商品对象的数量
    cartLength (state) {
        return state.cartList.length
    },

    // 购物车列表信息
    cartList (state) {
        return state.cartList
    }
}