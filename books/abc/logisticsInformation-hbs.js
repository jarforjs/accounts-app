define(function(require, exports, module) { var Handlerbars = require("common/handlerbars"); var str = "<div id=\"logistics-information\" class=\"fn-W700 fn-MT20 fn-ML100\">    <h1>物流信息：EMS  1116345180996</h1>    <ul>        <li>            <p><b>2015-04-28   周三   11:23:28  </b><span>妥投投递并签收，签收人：他人收 他人收</span></p>            <span class=\"before\"></span><span class=\"after\"></span></li>        <li>            <p>2015-04-28 07:38:44  <span>深圳市南油速递营销部安排投递（投递员姓名：蔡远发<a href=\"tel:18718860573\">18718860573</a>;联系电话：）</span></p>            <span class=\"before\"></span><span class=\"after\"></span></li>        <li>            <p>2015-04-28 05:08:00  <span>到达广东省邮政速递物流有限公司深圳航空邮件处理中心处理中心（经转）</span></p>            <span class=\"before\"></span><span class=\"after\"></span></li>        <li>            <p>2015-04-28 00:00:00  <span>离开中山市 发往深圳市（经转）</span></p>            <span class=\"before\"></span><span class=\"after\"></span></li>        <li>            <p>2015-04-27 15:00:00  <span>到达广东省邮政速递物流有限公司中山三角邮件处理中心处理中心（经转）</span></p>            <span class=\"before\"></span><span class=\"after\"></span></li>        <li>            <p>2015-04-27 08:46:00 <span>离开泉州市 发往中山市</span></p>            <span class=\"before\"></span><span class=\"after\"></span></li>        <li class=\"last\">            <p>2015-04-26 17:12:00  <span>泉州市速递物流分公司南区电子商务业务部已收件，（揽投员姓名：王晨光;联系电话：<a href=\"tel:13774826403\">13774826403</a>）</span></p>            <span class=\"before\"></span><span class=\"after\"></span><i class=\"new icon\"></i></li>    </ul></div>"; var compile = Handlerbars.compile(str); compile.source=str; return compile; });