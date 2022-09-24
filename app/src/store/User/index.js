//登录和注册的仓库

import { reqGetCode, reqUserReister, reqUserLogin, reqUserInfo, reqLogOut } from '@/api';
import { removeToken } from "../../utils/uuid_token";
const actions = {
	//获取请求
	async getCode ({ commit }, phone) {
		//获取验证码的接口：返回验证码，正常情况：后台把数据发送到用户
		let result = await reqGetCode(phone);
		if (result.code == 200) {
			commit('GETCODE', result.data);
			return "OK";
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	//用户注册
	async userRegister ({ commit }, user) {
		let result = await reqUserReister(user);
		if (result.code == 200) {
			return "OK";
		} else {
			return Promise.reject(new Error('faile'));
		}
	},
	//登录
	async userLogin ({ commit }, user) {
		let result = await reqUserLogin(user);
		//服务器下发token，用户唯一标识（uuid）  将来通过token找服务器要用户信息进行展示
		if (result.code == 200) {
			commit('USERLOGIN', result.data.token);
			//持久化存储token 
			localStorage.setItem('TOKEN', result.data.token);
			return "OK";
		} else {
			return Promise.reject(new Error('fail'));
		}
	},
	//获取用户信息
	async getUserInfo ({ commit }) {
		let result = await reqUserInfo();
		// 提交用户信息 
		if (result.code == 200) {
			commit('GETUSERINFO', result.data);
			return "OK";
		} else {
			return Promise.reject();
		}
	},
	//退出登录
	async userLogout ({ commit }) {
		//向服务器发起请求，清除token
		let result = await reqLogOut();
		if (result.code == 200) {
			//actions里不能操作state，提交mutation修改state
			commit('CLEAR', result.data);
			return "OK";
		} else {
			return Promise.reject(new Error('faile'));
		}
	}

};
const mutations = {
	GETCODE (state, code) {
		state.code = code;
	},
	USERLOGIN (state, token) {
		state.token = token;
	},
	GETUSERINFO (state, userInfo) {
		state.userInfo = userInfo;
	},
	//清除 本地数据
	CLEAR (state) {
		//仓库中用户信息清空
		state.token = '';
		state.userInfo = '';
		//本地存储数据清空
		removeToken();
	}
};
const getters = {};
const state = {
	code: '',
	token: localStorage.getItem('TOKEN'),
	userInfo: {}
};

export default {
	namespaced: true,
	actions,
	mutations,
	getters,
	state
};