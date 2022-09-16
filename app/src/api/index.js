//当前模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

//三级联动的接口
//  /api/product/getBaseCategoryList  get  无参数
//对外暴露一个函数，只要外部调用这个函数，就向AJAX发起请求，获取三级菜单的数据 **当前函数执行需要把服务器返回结果返回
export const reqCategortyList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'get' })

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }

//获取搜索模块   地址：/api/list   请求方式：post  参数：10个
//当前接口不需要接受外部传递参数
//当前接口（获取搜索模块的数据），给服务器传递一个默认参数【至少为一个空对象】
export const reqGetList = (params) =>
  requests({ url: '/list', method: 'post', data: params })
