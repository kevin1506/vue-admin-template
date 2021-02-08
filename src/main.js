import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import './assets/css/public/common.css'
// import './assets/css/public/less/common.css'
import './assets/iconfont/iconfont.css'
import * as customFilters from '@/assets/common/filter'
import comFun from '@/assets/common/utils'
import './assets/common/directives'
import echarts from 'echarts'

Vue.config.productionTip = false

Vue.prototype.comFun = comFun
Vue.prototype.$echarts = echarts
// 全局过滤器
Object.keys(customFilters).forEach((key) => {
  Vue.filter(key, customFilters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
