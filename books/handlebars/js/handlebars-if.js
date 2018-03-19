/**
 * Created by Administrator on 2016-11-18.
 */
define(function (require, exports, module) {
    require('jQuery');
    require('handlebars');

    <!--进行数据处理、html构造-->
    $(document).ready(function () {
        //模拟的json对象
        var data = [
            {
                "name": "张三",
                "sex": "0",
                "age": 18,
                "favorite": [
                    "唱歌","篮球"
                ]
            },
            {
                "sex": "0",
                "age": 22,
                "favorite": [
                    "上网","足球"
                ]
            },
            {
                "name": "妞妞",
                "sex": "1",
                "age": 18,
                "favorite": [
                    "电影", "旅游"
                ]
            }
        ];

        //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
        //$("#table-template").html()是jquery的语法，不懂的童鞋请恶补。。。
        var myTemplate = Handlebars.compile($("#table-template").html());

        Handlebars.registerHelper("addOne", function (index, options) {
            return parseInt(index) + 1;
        });

        Handlebars.registerHelper("transformation", function (value, options) {
            if (value == 0) {
                return "男"
            } else if (value == 1) {
                return "女"
            }
        });

        //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
        $('#tableList').html(myTemplate(data));
    });
});