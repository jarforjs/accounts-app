/**
 * Created by Administrator on 2016-11-18.
 */
define(function (require, exports, module) {
    require('jQuery');
    require('handlebars');

    $(document).ready(function () {
        //模拟的json对象
        var data = {
            "student": [
                {
                    "name": "张三",
                    "sex": "0",
                    "age": 23
                },
                {
                    "name": "李四",
                    "sex": "0",
                    "age": "18"
                },
                {
                    "name": "妞妞",
                    "sex": 1,
                    "age": 21
                }
            ]
        };


        //注册一个handlebars模板,通过id找到某一个模板,获取模板的html框架
        var template = Handlebars.compile($("#table-template").html());

        //注册一个比较大小的helper,判断v1是否大于v2
        Handlebars.registerHelper("compare", function (v1, v2, options) {
            if (v1 > v2) {
                //满足添加继续执行
                return options.fn(this);
            } else {
                //不满足条件执行{{else}}部分
                return options.inverse(this);
            }
        });

        //注册一个翻译用的helper,0翻译成男,1翻译成女
        Handlebars.registerHelper("transformation", function (value) {
            if (value == 0) {
                return "男";
            } else if (value == 1) {
                return "女";
            }
        });

        //将json对象用刚刚注册的handlebars模板封装,得到最终的html,插入到基础table中
        $('#tableList').html(template(data));
    })
});