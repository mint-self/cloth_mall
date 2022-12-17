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