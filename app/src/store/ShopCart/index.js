//shopcart的仓库

import { reqCartList,reqUpdateCart,reqDeleteCart } from '../../api/index'

const actions = {
  //获取购物车数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车某一个产品
  async deteleCartList({commit},skuId){
		let result =  await reqDeleteCart(skuId);
			if (result.code == 200) {
				return ' OK!'
			} else {
				//服务器数据加入失败
				return Promise.reject(new Error('fail'))
			}
	},
  //修改购物车某一个产品的选中状态 
  async UpdateCart({commit},{skuId,isChecked}){
	let result = await reqUpdateCart(skuId,isChecked)
		if (result.code == 200) {
			return'OK'
		}else{
			return Promise.reject(new Error('Error'))
		}
	},
	//删除全部选中的产品
	deteleAllCheckedCart({dispatch,getters}){
		let PromiseAll = [];
		getters.cartList.cartInfoList.forEach(element => {
			let promise = element.isChecked==1?dispatch('deteleCartList',element.skuId):'';
			//将每一次的结果保存到PromiseAll数组中
			PromiseAll.push(promise);
	});
	//只要全部的p1，p2,都成功，返回结果即为成功，如果有一个失败，返回失败结果
	return Promise.all(PromiseAll)
	},
	//修改全部产品的状态
	updateAllCartIschecked({dispatch,getters},isChecked){
		//数组
		let promiseAll = [];
		getters.cartList.cartInfoList.forEach(item=>{
			let promise = dispatch('UpdateCart',{skuId:item.skuId,isChecked});
			promiseAll.push(promise);
		});
		//最终返回结果
		return Promise.all(promiseAll);
	}
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  },
}
const state = {
  cartList: [],
}
//计算属性：在项目中，为了简化计算而生,简化仓库中的数据
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
