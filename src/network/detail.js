// 详情页网络请求对应的js文件

import {request} from './request'

// 定义一个获取详情页数据的函数
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 获取详情页推荐数据的函数
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}

// 因为这些信息分布在多处，所以先在网络请求的文件中，创建一个类，利用构造函数来存放所有的信息，也就是将信息作为构造函数的属性，这样当去new一个对象的时候，每个对象都可以去获取构造函数上的属性。
export class Goods {
    // 定义一个构造函数
    constructor (itemInfo, columns, services) {
        // 属性
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

// 封装获取商家信息的数据
export class Shop {
    // 定义一个构造函数
    constructor (shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

// 封装获取商品参数信息的数据
export class GoodsParams {
    constructor (info, rule) {
        // 不是每个商品都包含有这个，所以先判断下
        this.image = info.images ? info.images[0] : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}