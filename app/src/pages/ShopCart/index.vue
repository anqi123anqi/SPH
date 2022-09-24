<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul
					class="cart-list"
					v-for="cart in cartInfoList"
					:key="cart.id"
				>
					<li class="cart-list-con1">
						<input
							type="checkbox"
							name="chk_list"
							:checked="cart.isChecked == 1"
							@change="updateChecked(cart,$event)"
						>
					</li>
					<li class="cart-list-con2">
						<img :src="cart.imgUrl">
						<div class="item-msg">{{cart.skuName}}</div>
					</li>

					<li class="cart-list-con4">
						<span class="price">{{cart.skuPrice}}</span>
					</li>
					<li class="cart-list-con5">
						<a
							class="mins"
							@click="handle('reduce',-1,cart)"
						>-</a>
						<input
							autocomplete="off"
							type="text"
							minnum="1"
							class="itxt"
							:value="cart.skuNum"
							@change="handle('change',$event.target.value*1,cart)"
						>
						<a
							class="plus"
							@click="handle('add',1,cart)"
						>+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
					</li>
					<li class="cart-list-con7">
						<a
							@click="deteleCartByID(cart)"
							class="sindelet"
						>删除</a>
						<br>
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input
					class="chooseAll"
					type="checkbox"
					:checked="isAllcheck&&cartInfoList.length>0"
					@change="updateAllCartChecked"
				>
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="deteleAllCheckedCart">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">已选择
					<span>0</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{totalPrice}}</i>
				</div>
				<div class="sumbtn">
					<a
						class="sum-btn"
						href="###"
						target="_blank"
					>结算</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import throttle from 'lodash/throttle'
	export default {
		name: 'ShopCart',
		mounted () {
			this.getDate();
		},
		methods: {
			//获取某个人购物车数据
			getDate () {
				this.$store.dispatch('shopcart/getCartList');
			},
			//节流
			handle: throttle(async function (type, disNum, cart) {
				//type:为了区分三个元素
				//目前dsiNum形参：+ 变化量（1） -变化量（-1） input 最终的个数
				//cart：那一个产品
				//向服务器发请求，改数据
				switch (type) {
					case "add":
						disNum = 1;
						break;
					case "reduce":
						disNum = cart.skuNum > 1 ? -1 : 0;
						break;
					case "change":
						if (isNaN(disNum) || disNum < 0) {
							disNum = 0;
						} else {
							disNum = parseInt(disNum) - cart.skuNum
						}
				}
				try {
					//派发action
					await this.$store.dispatch('detail/addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum });
					//再次发请求，更新数据
					this.getDate();
				} catch (error) {
					//3.失败：给用户提示
					alert(error.massage);
				}
			}, 500),
			//删除购物车某一个产品
			async deteleCartByID (cart) {
				try {
					await this.$store.dispatch('shopcart/deteleCartList', cart.skuId);
					//如果成功则再次发起请求
					this.getDate();
				} catch (error) {
					alert(error.massage)
				}
			},
			//修改购物车某一个产品的选中状态
			async updateChecked (cart, event) {
				try {
					let isChecked = event.target.checked ? '1' : '0';
					await this.$store.dispatch('shopcart/UpdateCart', { skuId: cart.skuId, isChecked: isChecked });
					this.getDate();
				} catch (error) {
					alert(error.massage)
				}
			},
			//删除全部选中的产品 无需传参
			async deteleAllCheckedCart () {
				try {
					await this.$store.dispatch('shopcart/deteleAllCheckedCart'),
						//再发请求获取购物车列表
						this.getDate()
				} catch (error) {
					alert(error.message)
				}
			},
			//修改全部产品的选中状态、
			async updateAllCartChecked (event) {
				try {
					let isChecked = event.target.checked ? "1" : "0";
					//派发action
					await this.$store.dispatch('shopcart/updateAllCartIschecked', isChecked);
					this.getDate();
				} catch (error) {
					alert(error.message);
				}
			}
		},
		computed: {
			...mapGetters('shopcart', ['cartList']),
			//购物车数据
			cartInfoList () {
				return this.cartList.cartInfoList || []
			},
			//计算购买产品的总价
			totalPrice () {
				let sum = 0;
				this.cartInfoList.forEach(item => {
					sum = item.skuNum * item.skuPrice
				});
				return sum;

				// //filter+reduce
				// this.cartInfoList.filter(item => item.isChecked === 1)
				//     .reduce((pre, item) => (pre += item.skuNum * item.skuPrice), 0);
			},
			//全选 
			isAllcheck () {
				return this.cartInfoList.every(item => item.isChecked == 1);
			}
		}

	}
</script>

<style
	lang="less"
	scoped
>
	.cart {
		width: 1200px;
		margin: 0 auto;

		h4 {
			margin: 9px 0;
			font-size: 14px;
			line-height: 21px;
		}

		.cart-main {
			.cart-th {
				background: #f5f5f5;
				border: 1px solid #ddd;
				padding: 10px;
				overflow: hidden;

				&>div {
					float: left;
				}

				.cart-th1 {
					width: 25%;

					input {
						vertical-align: middle;
					}

					span {
						vertical-align: middle;
					}
				}

				.cart-th2 {
					width: 25%;
				}

				.cart-th3,
				.cart-th4,
				.cart-th5,
				.cart-th6 {
					width: 12.5%;

				}
			}

			.cart-body {
				margin: 15px 0;
				border: 1px solid #ddd;

				.cart-list {
					padding: 10px;
					border-bottom: 1px solid #ddd;
					overflow: hidden;

					&>li {
						float: left;
					}

					.cart-list-con1 {
						width: 15%;
					}

					.cart-list-con2 {
						width: 35%;

						img {
							width: 82px;
							height: 82px;
							float: left;
						}

						.item-msg {
							float: left;
							width: 150px;
							margin: 0 10px;
							line-height: 18px;
						}
					}



					.cart-list-con4 {
						width: 10%;

					}

					.cart-list-con5 {
						width: 17%;

						.mins {
							border: 1px solid #ddd;
							border-right: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}

						input {
							border: 1px solid #ddd;
							width: 40px;
							height: 33px;
							float: left;
							text-align: center;
							font-size: 14px;
						}

						.plus {
							border: 1px solid #ddd;
							border-left: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}
					}

					.cart-list-con6 {
						width: 10%;

						.sum {
							font-size: 16px;
						}
					}

					.cart-list-con7 {
						width: 13%;

						a {
							color: #666;
						}
					}
				}
			}
		}

		.cart-tool {
			overflow: hidden;
			border: 1px solid #ddd;

			.select-all {
				padding: 10px;
				overflow: hidden;
				float: left;

				span {
					vertical-align: middle;
				}

				input {
					vertical-align: middle;
				}
			}

			.option {
				padding: 10px;
				overflow: hidden;
				float: left;

				a {
					float: left;
					padding: 0 10px;
					color: #666;
				}
			}

			.money-box {
				float: right;

				.chosed {
					line-height: 26px;
					float: left;
					padding: 0 10px;
				}

				.sumprice {
					width: 200px;
					line-height: 22px;
					float: left;
					padding: 0 10px;

					.summoney {
						color: #c81623;
						font-size: 16px;
					}
				}

				.sumbtn {
					float: right;

					a {
						display: block;
						position: relative;
						width: 96px;
						height: 52px;
						line-height: 52px;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-family: "Microsoft YaHei";
						background: #e1251b;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>


(type, disNum, cart) {
//type:为了区分三个元素
//目前dsiNum形参：+ 变化量（1） -变化量（-1） input 最终的个数
//cart：那一个产品
//向服务器发请求，改数据
switch (type) {
case "add":
disNum = 1;
break;
case "reduce":
disNum = cart.skuNum > 1 ? -1 : 0;
break;
case "change":
if (isNaN(disNum) || disNum <
	0)
	{
	disNum=0;
	}
	else
	{
	disNum=parseInt(disNum)
	-
	cart.skuNum
	}
	}
	try
	{
	//派发action
	await
	this.$store.dispatch('detail/addOrUpdateShopCart',
	{
	skuId:
	cart.skuId,
	skuNum:
	disNum
	});
	//再次发请求，更新数据
	this.getDate();
	}
	catch
	(error)
	{
	//3.失败：给用户提示
	alert(error.massage);
	}
	},