//当前模块：API进行统一管理
import requests from './request';
import mockRequests from './mockAjax';

//三级联动的接口
//  /api/product/getBaseCategoryList  get  无参数
//对外暴露一个函数，只要外部调用这个函数，就向AJAX发起请求，获取三级菜单的数据 **当前函数执行需要把服务器返回结果返回
export const reqCategortyList = () =>
	requests({ url: '/product/getBaseCategoryList', method: 'get' });

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');

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
	requests({ url: '/list', method: 'post', data: params });

//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：GET
export const reqGoodsInfo = (skuId) =>
	requests({ url: `/item/${skuId}`, method: 'get' });

//将产品添加到购物车（获取更新某一个产品的个数）  请求地址：cart/addToCart/{ skuId }/{ skuNum }  请求方式：POST  带参数
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
	requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

//获取购物车列表  url：/api/cart/cartList method：GET
export const reqCartList = () =>
	requests({ url: '/cart/cartList', method: 'get' });

//删除购物产品的接口   url：/api/cart/deleteCart/{skuId}   method：DELETE
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

//修改商品修改的状态   url:/api/cart/checkCart/{skuId}/{isChecked}   method:GET
export const reqUpdateCart = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

//获取验证码    url:/api/user/passport/sendCode/{phone}   method:get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册接口         url:/api/user/passport/register   method:post   phone，password，code
export const reqUserReister = (data) => requests({ url: '/user/passport/register', method: 'post', data });


//  登录       url:/api/user/passport/login    method:post   phone,password
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data });

//获取用户信息【需要携带用户的token向服务器要用户信息】  url:/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });

//退出登录   url：/api/user/passport/logout  method: get
export const reqLogOut = () => requests({ url: '/user/passport/logout', method: 'get' });

//获取用户地址 url:/api/user/userAddress/auth/findUserAddressList   method:get
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });

//获取商品清单   url:/api/order/auth/trade  method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });

//提交订单   url：/api/api/order/auth/submitOrder?tradeNo={tradeNo}  method：post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

//获取支付信息   url:/api/payment/weixin/createNative/{orderId}    method: get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取支付订单状态  url：/api/payment/weixin/createNative/{orderId}  method:GET
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取个人中心的数据   url：/api/order/auth/{page}/{limit}   method：GET
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });