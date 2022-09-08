<template>
  <div>
    <!-- 底部模块制作 start-->
    <div class="footer">
      <div class="w">
        <div class="mod_service">
          <ul>
            <li>
              <h5><img src="././images/正.png" alt="" /></h5>
              <div class="service_text">
                <h4>正品保障</h4>
                <p>正品保障，提供发票</p>
              </div>
            </li>
            <li>
              <h5><img src="./images/物流.png" alt="" /></h5>
              <div class="service_text">
                <h4>极速物流</h4>
                <p>急速物流，急速送达</p>
              </div>
            </li>
            <li>
              <h5><img src="././images/保.png" alt="" /></h5>
              <div class="service_text">
                <h4>无忧售后</h4>
                <p>7天无理由退换货</p>
              </div>
            </li>
            <li>
              <h5><img src="./images/特色.png" alt="" /></h5>
              <div class="service_text">
                <h4>特色服务</h4>
                <p>私人定制家电套餐</p>
              </div>
            </li>
            <li>
              <h5><img src="./images/帮助.png" alt="" /></h5>
              <div class="service_text">
                <h4>帮助中心</h4>
                <p>您的购物指南</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="mod_help">
          <dl>
            <dt>购物指南</dt>
            <dd><a href="#">购物流程</a></dd>
            <dd><a href="#">会员介绍</a></dd>
            <dd><a href="#">生活旅行/团购</a></dd>
            <dd><a href="#">常见问题</a></dd>
            <dd><a href="#">大家电</a></dd>
            <dd><a href="#">联系客服</a></dd>
          </dl>
          <dl>
            <dt>配送方式</dt>
            <dd><a href="#">上门自提</a></dd>
            <dd><a href="#">211限时达</a></dd>
            <dd><a href="#">配送服务查询</a></dd>
            <dd><a href="#">配送费收取标准</a></dd>
            <dd><a href="#">海外配送</a></dd>
          </dl>
          <dl>
            <dt>支付方式</dt>
            <dd><a href="#">货到付款</a></dd>
            <dd><a href="#">在线支付</a></dd>
            <dd><a href="#">分期付款</a></dd>
            <dd><a href="#">邮局汇款</a></dd>
            <dd><a href="#">公司转账</a></dd>
          </dl>
          <dl>
            <dt>售后服务</dt>
            <dd><a href="#">售后政策</a></dd>
            <dd><a href="#">价格保护</a></dd>
            <dd><a href="#">退款说明</a></dd>
            <dd><a href="#">返修/退换货</a></dd>
            <dd><a href="#">取消订单</a></dd>
          </dl>
          <dl>
            <dt>特色服务</dt>
            <dd><a href="#">夺宝岛</a></dd>
            <dd><a href="#">DIY装机</a></dd>
            <dd><a href="#">延保服务</a></dd>
            <dd><a href="#">品优购E卡</a></dd>
            <dd><a href="#">品优购通信</a></dd>
          </dl>
          <dl>
            <dt>帮助中心</dt>
            <dd><img src="./images/wx.png" alt="" /> 优品客户端</dd>
          </dl>
        </div>
        <div class="mod_copyright">
          <div class="link">
            <a href="#">关于我们</a> | <a href="#">联系我们</a> |
            <a href="#">联系客服</a> | <a href="#">商家入驻</a> |
            <a href="#">营销中心</a> | <a href="#">手机品优购</a> |
            <a href="#">友情链接</a> | <a href="#">销售联盟</a> |
            <a href="#">品优购社区</a> | <a href="#">品优购公益</a> |
            <a href="#">English Site</a> | <a href="#"> Contact U</a>
          </div>
          <div class="copyright">
            地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096
            电话：400-618-4000 传真：010-82935100 邮箱: zhanghj+itcast.cn <br />
            京ICP备08001421号京公网安备110108007702
          </div>
        </div>
      </div>
    </div>
    <!-- 底部模块制作 end-->
  </div>
</template>

<script>
export default {
  name: "MyFoot",
};
</script>

<style scoped>
/* 底部模块制作 */
.w {
  width: 1200px;
  margin: 0 auto;
}
.footer {
  height: 420px;
  padding-top: 30px;
  background-color: #f5f5f5;
}
.mod_service {
  height: 80px;
  border-bottom: 1px solid #d2d2d2;
}
.mod_service ul li {
  float: left;
  width: 240px;
  height: 50px;
  padding-left: 35px;
}
.mod_service ul li h5 {
  float: left;
}
.mod_service ul li h5 {
  width: 50px;
  height: 50px;
  margin-right: 6px;
}
.service_text {
  font-size: 14px;
  font-weight: 500;
}
.service_text p {
  font-size: 12px;
}
.mod_help {
  padding-left: 50px;
  padding-top: 20px;
  height: 190px;
  border-bottom: 1px solid #d2d2d2;
}
.mod_help dl {
  float: left;
  width: 200px;
}
.mod_help dl dt {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
}
.mod_help dd {
  font-size: 12px;
}
.mod_help dl:last-child {
  width: 90px;
  text-align: center;
}
</style>
