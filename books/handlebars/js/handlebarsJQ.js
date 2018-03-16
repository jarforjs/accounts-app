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
                name: "张三",
                sex: "男",
                age: 35,
                family: [
                    {
                        name: "张三儿子",
                        sex: "男",
                        age: 10,
                    },
                    {
                        name: "张三妻子",
                        sex: "女",
                        age: 33,
                    }
                ]
            },
            {
                name: "李四",
                sex: "男",
                age: 23,
                family: [
                    {
                        name: "李四妻子",
                        sex: "女",
                        age: 23,
                    }
                ]
            },
            {
                name: "甜妞",
                sex: "女",
                age: 18,
                family: [
                    {
                        name: "甜妞妈妈",
                        sex: "女",
                        age: 40,
                    },
                    {
                        name: "甜妞爸爸",
                        sex: "男",
                        age: 43,
                    },
                    {
                        name: "甜妞姥爷",
                        sex: "男",
                        age: 73,
                    }
                ]
            }
        ];

        //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
        //$("#table-template").html()是jquery的语法，不懂的童鞋请恶补。。。
        var myTemplate = Handlebars.compile($("#table-template").html());

        Handlebars.registerHelper("addOne", function (index, options) {
            this._index = index + 1;
            return this._index;
            //return parseInt(index) + 1;
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