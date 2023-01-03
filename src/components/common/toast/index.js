// 将Toast组件设置为一个插件

// 先导入Toast组件，以便可以将组件中的元素添加到插件中
import Toast from './Toast'

// 创建一个对象
const toastObj = {}
// 插件会使用install方法
toastObj.install = function (Vue) {
    // 不可以直接将Toast组件模板中的html元素添加过来的
    // document.body.appendChild(Toast.$el)   也就是这样是不行的

    // 应该使用下面的步骤
    // 1 创建组件构造器(也就是创建一个组件)
    const toastConstructor = Vue.extend(Toast)
    // 2 通过new操作符，根据创建好的组件构造器，创建出一个组件对象
    const toast = new toastConstructor()
    // 3 将组件对象手动的挂载到某一个元素上
    // 这里将toast对象挂载到div元素上
    toast.$mount(document.createElement('div'))
    // 4 挂载完成后，就可以给toast组件添加模板元素了
    document.body.appendChild(toast.$el)

    // 将toast组件对象挂载到Vue的原型上，这样其他的组件就可以直接使用$toast了
    Vue.prototype.$toast = toast
}

// 导出插件对象
export default toastObj



