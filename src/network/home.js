// 首页网络请求对应的js文件

// 1 先导入网络请求的函数request
import { request } from "./request"

// 2 创建首页组件的具体网络请求函数

// 获取首页各种数据的请求
export function getHomeMultidata() {
    // 返回通过request()函数创建的网络请求对象，是个Promise对象
    return request({
        url: '/home/multidata'
    })
}

// 获取首页商品列表数据的请求: 这个请求需要分辨要请求哪种类型的商品，以及要请求获取第几页的商品，所以需要传递type, page这2个参数
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}