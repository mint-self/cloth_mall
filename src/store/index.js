import Vue from 'vue'
import Vuex from 'vuex'
// 导入actions这些
import mutations from './mutations'
import actions from './actions'


// 安装使用Vuex插件
Vue.use(Vuex)

// state, actions等这些里面的逻辑代码太多，就抽离出去单独弄个文件

// 创建state对象
const state = {
    // 放入需要vuex管理的数据

    // 添加到购物的商品: cartList:[商品1，商品2， 商品3 ...] 其中每个商品都是一个对象
    cartList: []
}

/*
// 创建mutations
const mutations = {
    /* 一般情况下，mutations唯一的目的就是修改state中的状态，所以它里面的方法尽可能完成的事件比较单一即可，不要设置过多的逻辑，因此要借助actions来一起实现*/

    /*
    // 定义一个将商品添加到购物车的方法
    addCart (state, payload) {
        // payload表示该方法中要操作的对象, 是新添加到购物车的商品

        // 添加到购物车的原理：如果前后添加的是同个商品，不用再继续添加同一个对象了，只需要把该商品的数量加1即可，所以要判断前后添加的是否为同个商品
        //  传统遍历数组的方式来查找 
        let oldProduct = null
        for (let item of state.cartList) {
            // 根据商品的iid来判断是否是同个商品
            if (item.iid === payload.iid) {
                // 那么是同个商品
                oldProduct = item
            }
        }
        

        //  使用数组的api:find() 来查找: 行不通没法给oldProduct = item  
        // let oldProduct = state.cartList.find(item => {
        //     // 如果find再数组查找到符合条件的就返回对应元素，否则返回null
        //     item.iid === payload.iid
        // })

        // 判断如果是同个商品就直接数量加1，是新商品就添加新的商品对象
        if (oldProduct) {
            // 旧商品
            oldProduct.count += 1
        } else {
            // 新商品
            // 数量不变, 并添加新对象
            payload.count = 1
            state.cartList.push(payload)
        }
        // state.cartList.push(payload)
        // console.log('mutations');
    }
    */
    /*
    // 添加/修改购物车中商品的数量
    addCount (state, payload) {
        payload.count++
    },
    // 将商品添加到购物车
    addToCart (state, payload) {
        state.cartList.push(payload)
    }
}
*/

/*
// 创建actions对象
const actions = {
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
            context.commit('addCount',oldProduct)
        } else {
            payload.count = 1
            // context.state.cartList.push(payload)
            // 将商品添加到购物车
            context.commit('addToCart', payload)
        }
    }
}
*/

// 创建store对象
const store = new Vuex.Store({
    // 注册state,actions等
    state,
    mutations,
    actions,
})

// 创建store对象
// const store = new Vuex.Store({
//     // 注册state,actions等
//     state: {
//         // 放入需要vuex管理的数据

//         // 添加到购物的商品: cartList:[商品1，商品2， 商品3 ...] 其中每个商品都是一个对象
//         cartList: []
//     },
//     mutations: {
//         // 定义一个将商品添加到购物车的方法
//         addCart (state, payload) {
//             // payload表示该方法中要操作的对象
//             state.cartList.push(payload)
//             console.log('mutations');
//         }
//     }
// })

// 导出store对象
export default store