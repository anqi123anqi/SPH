<template>
  <div>
    <!-- 快捷导航栏模块start-->
    <section class="shortcut">
      <div class="w">
        <div class="fl">
          <ul>
            <li>品优购欢迎您！&nbsp;</li>
            <li>
              <!-- 声明式导航，必须要有to属性 -->
              <router-link to="/login">请登录</router-link>
              &nbsp;
              <router-link to="/register" class="style_red">免费注册
              </router-link>
            </li>
          </ul>
        </div>
        <div class="fr">
          <ul>
            <li>我的订单</li>
            <li></li>
            <li class="arrow-icon">我的品优购</li>
            <li></li>
            <li>品优购会员</li>
            <li></li>
            <li>企业采购</li>
            <li></li>
            <li class="arrow-icon">关注品优购</li>
            <li></li>
            <li class="arrow-icon">客户服务</li>
            <li></li>
            <li class="arrow-icon">网站导航</li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 快捷导航栏模块end-->
    <!-- header头部模块的start -->
    <header class="header w">
      <!-- logo模块 -->
      <div class="logo">
        <h1>
          <router-link to="/home" title="品优购商城">品优购商城</router-link>
        </h1>
      </div>
      <!-- search搜素模块 -->
      <div class="search">
        <input type="search" placeholder="卫衣男" name="" id="" v-model="keyword" />
        <button @click="goSearch">搜索</button>
      </div>
      <!-- hotwords模块 -->
      <div class="hotwords">
        <a href="#" class="style_red">优惠购首发 </a>
        <a href="#"> 亿元优惠 </a>
        <a href="#"> 9.9元团购 </a>
        <a href="#">美满99减30</a>
        <a href="#">办公用品</a>
        <a href="#">电脑</a>
        <a href="#">通信</a>
      </div>
      <!-- 购物车模块 -->
      <div class="shopcar">
        我的购物车
        <i class="count">80</i>
      </div>
    </header>
    <!-- header头部模块的end -->
  </div>
</template>

<script>
  export default {
    name: "MyHeader",
    methods: {
      //搜索按钮的回调函数 需要向Serarch跳转
      goSearch () {
        //路由传参
        //第一种：字符串形式
        // this.$router.push(
        //   "/search" + this.keyword + "?k=" + this.keyword.toUpperCase()
        // );
        //第二种：字符串模板
        // this.$router.push(
        //   `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`
        // );
        //第三种：对象
        this.$router.push({
          name: "search",
          // params: { keyword: this.keyword },
          query: { keyword: this.keyword.toUpperCase() },
        });
      },
    },
    data () {
      return {
        keyword: "",
      };
    },
  };
</script>

<style scoped>
  .w {
    width: 1200px;
    margin: 0 auto;
  }

  /* 图标字体申明 注意路径的变化*/
  /* @font-face {
  font-family: "icomoon";
  src: url("../fonts/icomoon.eot?a16r54");
  src: url("fonts/icomoon.eot?a16r54#iefix") format("embedded-opentype"),
    url("../fonts/icomoon.ttf?a16r54") format("truetype"),
    url("../fonts/icomoon.woff?a16r54") format("woff"),
    url("../fonts/icomoon.svg?a16r54#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
} */
  /* 快捷导航栏 */
  .shortcut {
    height: 31px;
    line-height: 31px;
    background-color: #f1f1f1;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .style_red {
    color: #c81623;
  }

  .shortcut ul li {
    float: left;
  }

  /* 选择所有的偶数li */
  .shortcut .fr ul li:nth-child(even) {
    width: 1px;
    height: 12px;
    margin: 9px 15px;
    background-color: #666;
  }

  .arrow-icon::after {
    font-family: "icomoon";
    content: "\e900";
  }

  /* 头部制作 */
  .header {
    position: relative;
    height: 105px;
  }

  .logo {
    position: absolute;
    top: 25px;
    width: 171px;
    height: 61px;
  }

  .logo a {
    display: block;
    width: 171px;
    height: 61px;
    background: url(./images/logo.png) no-repeat;
    font-size: 0;
    /* 淘宝隐藏
  text-indent: -999px;
  overflow: hidden; */
  }

  .search {
    position: absolute;
    top: 25px;
    left: 346px;
    width: 538px;
    height: 36px;
    border: 2px solid #b1191a;
  }

  .search input {
    float: left;
    width: 455px;
    height: 32px;
    padding-left: 10px;
  }

  .search button {
    float: left;
    width: 79px;
    height: 33px;
    background-color: #b1191a;
    font-size: 16px;
    color: #fff;
    margin-top: -1px;
  }

  .hotwords {
    position: absolute;
    left: 346px;
    bottom: 24px;
  }

  .hotwords a {
    margin: 0 13px;
  }

  .shopcar {
    position: absolute;
    top: 25px;
    right: 64px;
    width: 140px;
    height: 38px;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    background-color: #f5f5f5;
    border: solid 1px #dfdfdf;
  }

  .shopcar::before {
    font-family: "icomoon";
    content: "\e901";
    color: #b1191a;
    font-size: 20px;
    margin: 5px;
  }

  .shopcar::after {
    font-family: "icomoon";
    content: "\e900";
  }

  .count {
    position: absolute;
    left: 105px;
    top: -3px;
    padding: 0 5px;
    line-height: 14px;
    height: 14px;
    color: #fff;
    background-color: #b1191a;
    border-radius: 7px 7px 7px 0;
  }
</style>