/**
 * Created by Administrator on 2016-11-18.
 */
define(function (require, exports, module) {
    require('jQuery');
    require('handlebars');

    <!--进行数据处理、html构造-->
    $(document).ready(function () {
        //模拟的json对象
        var data = {
            "student": [
                {
                    "name": "张三",
                    "sex": "0",
                    "age": 18,
                    "homePage": "<a href='javascript:void(0);'>张三的个人主页</a>"
                },
                {
                    "name": "李四",
                    "sex": 0,
                    "age": 22,
                    "homePage": "<a href='javascript:void(0);'>李四的个人主页</a>"
                },
                {
                    "name": "妞妞",
                    "sex": 1,
                    "age": "19",
                    "homePage": "<a href='javascript:void(0);'>妞妞的个人主页</a>"
                },
                {
                    "sex": 0,
                    "age": 33,
                    "homePage": "<a href='javascript:void(0);'>赵倩的个人主页</a>"
                },
                {
                    "name": "孙俪",
                    "sex": 0,
                    "age": 41,
                    "homePage": "<a href='javascript:void(0);'>孙俪的个人主页</a>"
                },

            ]
        };

        //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
        //$("#table-template").html()是jquery的语法，不懂的童鞋请恶补。。。
        var myTemplate = Handlebars.compile($("#table-template").html());

        Handlebars.registerHelper("addOne", function (index, options) {
            return parseInt(index) + 1;
        });

        Handlebars.registerHelper("compare", function (v1, v2, options) {
            if (v1 > v2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });

        Handlebars.registerHelper("transformation", function (value) {
            if (value == 0) {
                return "男"
            } else if (value == 1) {
                return "女"
            }
        });

        Handlebars.registerHelper("link",function (homePage) {
            homePage=Handlebars.Utils.escapeExpression(this.homePage);
            console.log(new Handlebars.SafeString(homePage));
            return new Handlebars.SafeString(homePage);
        })

        //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
        $('#tableList').html(myTemplate(data));
    });
});