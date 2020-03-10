import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入Vant组件库
import Vant from 'vant';
import Vlazy from 'v-lazy'
import 'vant/lib/index.css';
import '@vant/touch-emulator';

//导入Toast（自己封装的插件）
import Toast from '@/components/common/toast'

//导入vue的懒加载插件
import VueLazyLoad from 'vue-lazyload'

//安装插件
Vue.use(Vant)
Vue.use(Vlazy)
Vue.use(Toast)
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/Strongload.jpg')
})


//事件总线
Vue.prototype.$bus = new Vue()


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


