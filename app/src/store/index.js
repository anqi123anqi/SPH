//该文件用于创建Vue最核心的store

import Vue from 'vue';
import Vuex from 'vuex';
//使用Vuex插件
Vue.use(Vuex);

import home from './Home';
import search from './Search';
import detail from './Detail';
import shopcart from './ShopCart';
import user from './User';
import trade from './Trade';

//创建并导出 store
export default new Vuex.Store({
	//实现Vue仓库模块式开发数据
	modules: {
		home,
		search,
		detail,
		shopcart,
		user,
		trade,
	},
});
