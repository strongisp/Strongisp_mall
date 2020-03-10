//转变核心

export default {
    //添加商品数量（vue-devtools监听）
    addCounter(state, payload) {
        payload.count++
    },
    //添加商品（vue-devtools监听）
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    },
    //删除商品（vue-devtools监听）
    deleteCart(state, payload) {
        state.cartList.splice(payload, 1);
    },
    //商品数量减
    reduceGoods(state, payload) {
        return payload.count--;
    },
    //商品数量加
    addGoods(state, payload) {
        return payload.count++;
    }
}