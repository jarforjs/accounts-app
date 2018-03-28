一、vm传值到hbs文件
文件列表
father.vm
child.vm
main.js（child.vm的）
child.hbs
以变量status为例进行传值

<!--  father.vm  -->
$control.setTemplate("child.vm").setParameter("status",$!lassenLegalCaseDo.status)

<!--  child.vm  -->
<div id="applicationMatters" widget="model/child/main" data-status="$!status"></div>

<!--  main.js  -->
data = { status:me.get('status')};

<!--  child.hbs  -->
{{status}}  //直接可在双括号中调用


二、vm传值到本页面的js——通过html元素传值
例一：
<!--  page.vm  -->
<div id="data" data-rate = "$!rate" data-fee-rate="$!feeRate" data-fee-reduct="$!feeReduct" data-instalment-count="$!instalmentCount" data-instalment-amount="$!instalmentAmount" ></div>

<!--  main.js  -->
var data = $("#data");
var rate = data.data("rate");//罚息日利率
var feeRate = data.data("feeRate");//费用利率
var feeReduct = data.data("feeReduct");//费用减免
var instalmentCount = data.data("instalmentCount");//分期数
var instalmentAmount = data.data("instalmentAmount");//总本金

例二：
传map类型的一系列数据


#noescape()$!{msg}#end  可以防止转译.例如:
防止转译velocity中用noescape,handlebars中可以用{{{}}}
1.#noescape()<br />#end ==>> 页面中显示 '换行'
2.{{{<br />}}} ==>> 页面中显示 '换行'



<!--  page.vm  -->
data-bill-list='#noescape()$optionUtil.getJsonByMap($!monthdata)#end'

<!--  main.js  -->
billList = me.get('billList')

例三：
<!--  page.vm  -->
<tr data-data='#noescape()$optionUtil.getJsonByMap($LassenSettlementCalDetailVo)#end'></tr>

<!--  main.js  -->
$("tbody tr").on('mouseover',function(){
    var self = $(this);
    var data = self.data('data');
});

三、vm传值到子vm文件中
文件列表
father.vm
child.vm

<!--  father.vm  -->
$control.setTemplate("child.vm").setParameter("status",$!lassenLegalCaseDo.status)

<!--  child.vm  -->
$!status"  //直接可以调用


templates
文件
control：小模块
layout：布局文件，本项目中的layout文件可以引用其他项目中control中的vm，但只能被本项目引用
screen：完整页面，可以引用layout中的布局文件，还可以引用control中的小模块
引入方法
$rundata.setLayout(）引入layout布局
$control.setTemplate(）引入control小模块

定义layout布局 $control.setTemplate("common:header.vm")  //可以引用其他项目中control中的vm，冒号前为其他项目名，冒号后为该项目下control目录下的对应文件
在screen中引入layout布局  $rundata.setLayout('casepage.vm')  //被调用的layout文件必须和调用页面在一个templates目录下
在screen中引入control中的模板vm
引入本项目下文件 $control.setTemplate("caseDetail/courtSchedueRecord.vm")
引入其他项目下的文件 $control.setTemplate("common:robot.vm")


