//Detail的仓库

import { reqGoodsInfo, reqAddOrUpdateShopCart, } from '../../api/index'
//封装游客身份uuid——》生成一个随机字符（不能再改变）
import { getUUID } from '../../utils/uuid_token'

const actions = {
  //通过API里面的接口函数调用，向服务器发起请求，获取数据
  async getGoodsInfo(context, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      context.commit('GETGOODSINFO', result.data)
    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart( {commit},{ skuId, skuNum }) {
    //加入购物车返回的解构
    //加入购物车后（发请求） 前台将参数带给服务器 ， 服务器写入数据成功，并没有数据返回，因此不需要三连环储存数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    //服务加入数据成功
    if (result.code == 200) {
      return ' OK!'
    } else {
      //服务器数据加入失败
      return Promise.reject(new Error('fail'))
    }
  },
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
}
const state = {
  goodsInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
}
const getters = {
  //路径导航简化的数据
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  //简化产品信息数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  //产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
