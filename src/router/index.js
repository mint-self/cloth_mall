import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 使用路由懒加载
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')

// 安装路由插件
Vue.use(VueRouter)

// 注册路由
const routes = [
    {
        // 让home作为首页
        path: '',
        redirect: '/home'
    },
    // 首页
    {
        path: '/home',
        component: Home
    },
    // 分类页
    {
        path: '/category',
        component: Category
    },
    // 购物车
    {
        path: '/cart',
        component: Cart
    },
    // 我的页面
    {
        path: '/profile',
        component: Profile
    },
    // 商品详情页
    {
        // 动态传递参数iid
        path: '/detail/:iid',
        component: Detail
    }
]

// 创建路由实例
const router = new VueRouter({
    routes,
    // 设置为history模式
    mode: 'history'
})

// 向外暴露路由实例
export default router