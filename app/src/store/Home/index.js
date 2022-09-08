//MyHome的小仓库

import { reqCategortyList } from '../../api/index'

const actions = {
  //通过API里面的接口函数调用，向服务器发起请求，获取数据
  async CategortyList(context) {
    let result = await reqCategortyList()
    if (result.code == 200) {
      context.commit('CATEGORYLIST', result.data)
    }
  },
}

const mutations = {
  CATEGORYLIST(state, categortyList) {
    // categortyList.pop()
    state.categortyList = categortyList
  },
}

const state = {
  categortyList: [],
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
}
