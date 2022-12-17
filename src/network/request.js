// 在这个文件中，做统一的网络请求

// 导入axios插件
import axios from 'axios'

// 创建一个网络请求的函数
export function request(config) {
    // 1 创建一个axios实例
    const instance = axios.create({
        // 根路径
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 2 设置网络请求拦截器
    // 2.1 发请求时的拦截器
    instance.interceptors.request.use(config => {
            // 请求成功返回config实例
            return config
        },
        // 请求错误
        err => {
            console.log(err)
        }
    )

    // 2.2 响应回来的拦截器
    instance.interceptors.response.use(res => {
            // 响应成功 只有res中的data才是我们要的数据，其他的是浏览器返回的，所以可以不要
            return res.data
        },
        // 响应错误的
        err => {
            console.log(err)
        }
    )

    // 3 发起网络请求，就是将axios实例返回
    return instance(config)
}