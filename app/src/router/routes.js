// //配置路由
// import Vue from 'vue';
// import VueRouter from 'vue-router';

// //重写push方法
// const originPush = VueRouter.prototype.push; // 把官方的push方法暂存到originPush这个变量里面
// VueRouter.prototype.push = function push (location) {
// 	// 参数是调用push方法传进来的参数
// 	return originPush.call(this, location).catch(() => { });
// };

// //使用插件
// Vue.use(VueRouter);

//配置路由组件
import Home from '../pages/Home/MyHome.vue';
import Search from '../pages/Search/MySearch.vue';
import Login from '../pages/Login/index.vue';
import Register from '../pages/Register/index.vue';
import Detail from '../pages/Detail/index.vue';
import AddCartSuccess from '../pages/AddCartSuccess/index.vue';
import ShopCart from '../pages/ShopCart';
//
export default [
	{
		path: '/home',
		component: Home,
		meta: { show: true },
	},
	{
		path: '/detail/:skuid',
		component: Detail,
		meta: { show: true },
	},
	{
		name: 'search',
		//   path: '/search',
		path: '/search/:keyword?', //params 传参占位
		component: Search,
	},
	{
		path: '/login',
		component: Login,
		meta: { show: true },
	},
	{
		path: '/register',
		component: Register,
		meta: { show: true },
	},
	{
		path: '/addcartsucces',
		name: 'addcartsucces',
		component: AddCartSuccess,
		meta: { show: true },
	},
	{
		path: '/shopCart',
		name: 'shopCart',
		component: ShopCart,
		meta: { show: true },
	},
	//重定向：在项目跑起来时，访问立马定位到首页
	{
		path: '/',
		redirect: 'home',
	},
]

