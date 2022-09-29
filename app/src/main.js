import Vue from 'vue';
import App from './App.vue';

//引入路由
import router from './router';
Vue.config.productionTip = false;

//element注册全局组件
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//三级联动组件--全局组件
import TypeNav from './components/TypeNav';
//第一个参数：全局组件的名字，第二个参数：那一个组件
Vue.component(TypeNav.name, TypeNav);
// //轮播图
// import Carousel from './components/MyCarousel/'
// Vue.component(Carousel.name, Carousel)
//分页器
import MyPagination from './components/MyPagination';
Vue.component(MyPagination.name, MyPagination);

//引入Vuex的store文件
import store from './store/index';

//引入MockServer.js---mock数据
import './mock/mockServer';

//引入swiper样式
import 'swiper/css/swiper.css';

//统一接口api文件夹里面全部请求与函数
//统一暴露
import * as API from '@/api';

//引入vue-lazyload插件
import VueLazyload from "vue-lazyload";
import atm from "@/assets/1.gif";
//注册vue-lazyload插件
Vue.use(VueLazyload, {
	preLoad: 1.3,
	//懒加载默认图片
	loading: atm,
	attempt: 1
});
//引入自定义插件
import myPlugins from '@/plugins/MyPlugins';
Vue.use(myPlugins);
//引入校验插件
import '@/plugins/validate';
new Vue({
	el: '#app',
	render: (h) => h(App),
	//注册路由：底下的写法kv一致省略v 【router小写】
	router,
	store, //注册仓库：组件身上会多一个$store属性
	beforeCreate () {
		//全局事件总线
		Vue.prototype.$bus = this;
		Vue.prototype.$API = API;
	},
});
