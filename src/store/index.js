import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

//共享的动态
const state = {
    cartList: []
}

//vuex实例
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store