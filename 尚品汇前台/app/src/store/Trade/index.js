//Addres的小仓库

import { reqAddressInfo, reqOrderInfo, } from '@/api/index';

const actions = {
	//获取用户地址
	async getUserAddres ({ commit }) {
		let result = await reqAddressInfo();
		commit('GETUSERADDRES', result.data);
	},
	//获取商品清单
	async getOrderInfo ({ commit }) {
		let result = await reqOrderInfo();
		if (result.code == 200) {
			commit('GETORDERINFO', result.data);
		}
	},
	// //提交订单:tradeNO 交易编码   data:付款人信息
	// async submitInfo ({ commit }, { tradeNo, data }) {
	// 	//提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
	// 	let result = await reqSubmitOrder(tradeNo, data);
	// 	console.log(result);
	// 	// if (result.code == 200) {
	// 	// 	commit('SUBMITINFO', result.data);
	// 	// 	return 'ok';
	// 	// } else {
	// 	// 	return Promise.reject(new Error(result.message));
	// 	// }
	// }
};

const mutations = {
	GETUSERADDRES (state, address) {
		state.address = address;
	},
	GETORDERINFO (state, orderInfo) {
		state.orderInfo = orderInfo;
	},
	// SUBMITINFO (state, payId) {
	// 	state.payId = payId;
	// }
};

const state = {
	address: [],
	orderInfo: {},
};

export default {
	namespaced: true,
	actions,
	mutations,
	state,
}

