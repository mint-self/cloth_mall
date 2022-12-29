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


// 时间戳格式转化
// new Date(value * 1000).toLocaleString()  // 返回值的格式为 yyyy/MM/dd 下午 hh:mm:ss
export function formatDate(date, fmt) {
    // 1.获取年份 y+ 一个或多个y，正则表达式：匹配字符串
    if(/(y+)/.test(fmt)) {
      // RegExp.$1 即匹配到的/(y+)/字符串，将其替换为逗号后的(date.getFullYear() + '')...
      // (date.getFullYear() + '')是将时间加上一个空串，将数值转化为字符串
      // substr截取字符串，截取的个数为 4-匹配的字符串的长度，如果匹配的字符串为2019，则不截取，显示2019
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  }
  // 不足两位则要补齐两位： 01：02
  // 如果传入的str为 04，则执行 0004.substr(2) -> 04
  // if str = 4  -> 004.sbustr(1)  ->  04
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  }