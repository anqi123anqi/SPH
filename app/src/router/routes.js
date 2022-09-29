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

//引入二级路由
// import MyOrder from '@/pages/Center/myOrder';
// import GroupOrder from '@/pages/Center/groupOrder';

/*当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/

export default [
	{
		path: '/home',
		component: () => import('@/pages/Home/MyHome'),
		meta: { show: true },
	},
	{
		path: '/detail/:skuid',
		component: () => import('@/pages/Detail'),
		meta: { show: true },
	},
	{
		name: 'search',
		//   path: '/search',
		path: '/search/:keyword?', //params 传参占位
		component: () => import('@/pages/Search/MySearch.vue'),
	},
	{
		path: '/login',
		component: () => import('@/pages/Login'),
		meta: { show: true },
	},
	{
		path: '/register',
		component: () => import('@/pages/Register'),
		meta: { show: true },
	},
	{
		path: '/addcartsucces',
		name: 'addcartsucces',
		component: () => import('@/pages/AddCartSuccess'),
		meta: { show: true },
	},
	{
		path: '/shopCart',
		name: 'shopCart',
		component: () => import('@/pages/ShopCart'),
		meta: { show: true },
	},
	{
		path: '/trade',
		name: 'trade',
		component: () => import('@/pages/Trade'),
		meta: { show: true },
		//路由独享守卫
		beforeEnter: (to, from, next) => {
			//去交易页面，必须是从购物车而来
			if (from.path == '/shopCart' || from.path == '/') {
				next();
			} else {
				next(from.path);
			}
		}
	},
	{
		path: '/pay',
		name: 'pay',
		component: () => import('@/pages/Pay'),
		meta: { show: true },
		beforeEnter: (to, from, next) => {
			if (from.path == '/trade') {
				next();
			} else {
				next(false);
			}
		}
	},
	{
		path: '/paySuccess',
		name: 'paySuccess',
		component: () => import('@/pages/PaySuccess'),
		meta: { show: true },
	},
	{
		path: '/center',
		name: 'center',
		component: () => import('@/pages/Center'),
		meta: { show: true },
		children: [{
			path: 'myorder',
			component: () => import('@/pages/Center/myOrder')
		},
		{
			path: 'grouporder',
			component: () => import('@/pages/Center/groupOrder')
		},
		{
			path: '/center',
			redirect: 'myorder',
		},]
	},
	//重定向：在项目跑起来时，访问立马定位到首页
	{
		path: '/',
		redirect: 'home',
	},
]

