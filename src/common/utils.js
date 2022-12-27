// 工具类

// 防抖函数
// 不要让图片没加载一次就调用一次refresh()，这样让这个方法调用得太频繁了，会对服务器造成压力。所以设置防抖函数，每加载一次图片，就等一会再加载一次，可以设置先等待100或者500ms,再发送请求，这样就可以减少refresh的请求次数
export function debounce (fun, delay) {
    // fun是传入的需要设置防抖的函数，delay是防抖的时间
    let timer = null
    return function (...args) {
        // ...args因为传入的参数可能不止一个

        /*
         如果已经存在了一个定时器就将这个定时器给清除掉.
         比如说第一次加载图片时，这个时候定时器timer = null 所以不用清除；
         第二次加加载图片时，有可能是还没到delay的的时间结束，所以就直接将timer清除掉，这样就会继续进入setTimeout进行等待，这样就可以实现防抖，不会每加载一次图片就请求一次refresh
        */
        if (timer) clearTimeout(timer)
        // 设置一个定时器
        timer = setTimeout(() => {
            // 调用传入的需要设置防抖的函数
            fun.apply(this, args)
        }, delay)
    }
}