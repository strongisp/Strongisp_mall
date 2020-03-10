import Loading from './Loading'

const obj = {}

obj.install = function (Vue) {
    //1.创建组件构造器
    const loadingContrustor = Vue.extend(Loading)

    //2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const loading = new loadingContrustor()

    //3.将组件对象，手动挂载到某个元素上
    loading.$mount(document.createElement('div'))

    //4.toast.$el对应的就是div
    document.body.appendChild(loading.$el)

    Vue.prototype.$loading = loading
}

export default obj