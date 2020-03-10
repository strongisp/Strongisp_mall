//异步核心

export default {
    //添加商品到state中
    addCart({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            //1.判断是否cartList中已有该key
            let oldProduct = state.cartList.find(item => item.iid === payload.iid)
            //2.有则在原来的key中的count加一，没有则在新的商品中添加一个count属性，并添加到cartList中s

            if (oldProduct) {
                commit('addCounter', oldProduct)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                commit('addToCart', payload)
                resolve('商品已添加到购物车')
            }
        })
    },
    //删除商品数据
    deleteCart({ commit }, payload) {
        commit('deleteCart', payload)
    }

}
