//Search的仓库

import { reqGetList } from '../../api/index'

const actions = {
  //获取Search数据
  async getSearchList(context, params = {}) {
    //当前getSearchLis函数在被调用获取服务器时，至少需要传递一个参数（空对象）
    let result = await reqGetList(params)
    if (result.code == 200) {
      context.commit('GETSEARCHLIST', result.data)
    }
  },
}
const mutations = {
  GETSEARCHLIST(state, SearchList) {
    state.SearchList = SearchList
  },
}
const state = {
  SearchList: {},
}
//计算属性：在项目中，为了简化计算而生,简化仓库中的数据
const getters = {
  goodsList(state) {
    //如果数据返回，结果是数组，如果没有网络，返回应该是undefined
    return state.SearchList.goodsList || []
  },
  attrsList(state) {
    return state.SearchList.attrsList || []
  },
  trademarkList(state) {
    return state.SearchList.trademarkList || []
  },
  total(state) {
    return state.SearchList.total || []
  },
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
}
