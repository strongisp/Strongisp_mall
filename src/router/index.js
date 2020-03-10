import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载模式
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Me = () => import('@/views/me/Me')
const Detail = () => import('@/views/detail/Detail')

Vue.use(VueRouter)

//配置push重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

//配置replace重复问题
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function repalce(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

//路由（router）实例
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            meta: {
                title: 'Vue高仿蘑菇街_首页_作者strongisp_邮箱1461808904@qq.com'
            }
        },
        {
            path: '/category',
            component: Category,
            meta: {
                title: 'Vue高仿蘑菇街_分类_作者strongisp_邮箱1461808904@qq.com'
            }
        },
        {
            path: '/cart',
            component: Cart,
            meta: {
                title: 'Vue高仿蘑菇街_购物车_作者strongisp_邮箱1461808904@qq.com'
            }
        },
        {
            path: '/me',
            component: Me,
            meta: {
                title: 'Vue高仿蘑菇街_我的_作者strongisp_邮箱1461808904@qq.com'
            }
        },
        {
            path: '/detail/:iid',
            component: Detail,
            meta: {
                title: 'Vue高仿蘑菇街_详情页_作者strongisp_邮箱1461808904@qq.com'
            }
        }

    ],
    mode: 'history'
})


//路由守卫，动态改变title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})



export default router
