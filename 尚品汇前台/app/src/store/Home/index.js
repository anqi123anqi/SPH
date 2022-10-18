//MyHome的小仓库

import {
  reqCategortyList,
  reqGetBannerList,
  reqFloorList,
} from '../../api/index'

const actions = {
  //通过API里面的接口函数调用，向服务器发起请求，获取数据
  async CategortyList(context) {
    let result = await reqCategortyList()
    if (result.code == 200) {
      context.commit('CATEGORYLIST', result.data)
    }
  },
  //获取首页轮播图的数据
  async getBannerList(context) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      context.commit('BANNERLIST', result.data)
    }
  },
  //获取Floor数据
  async getFloorList(context) {
    let result = await reqFloorList()
    if (result.code == 200) {
      context.commit('FLOORLIST', result.data)
    }
  },
}

const mutations = {
  CATEGORYLIST(state, categortyList) {
    // categortyList.pop()
    state.categortyList = categortyList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}

const state = {
  categortyList: [],
  bannerList: [],
  //floor组件的数据
  floorList: [],
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
}
