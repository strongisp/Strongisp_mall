export default {
    //商品的类别数量
    cartGoodsLength(state) {
        return state.cartList.length
    },
    //商品数据
    cartGoodsList(state) {
        return state.cartList
    }
}