import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from './router'
Vue.config.productionTip = false

//三级联动组件--全局组件
import TypeNav from './components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：那一个组件
Vue.component(TypeNav.name, TypeNav)

//引入Vuex的store文件
import store from './store/index'

//引入MockServer.js---mock数据
import './mock/mockServer'

//引入swiper样式
import 'swiper/css/swiper.css'

new Vue({
  el: '#app',
  render: (h) => h(App),
  //注册路由：底下的写法kv一致省略v 【router小写】
  router,
  store, //注册仓库：组件身上会多一个$store属性
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this
  },
})
