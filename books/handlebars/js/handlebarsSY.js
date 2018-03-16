/**
 * Created by Administrator on 2016-11-18.
 */
define(function (require, exports, module) {
    require('jQuery');
    require('handlebars');

    <!--进行数据处理、html构造-->
    $(document).ready(function () {
        //模拟的json对象
        // var data = {
        //     "student": [
        //         {
        //             "name": "张三",
        //             "sex": "0",
        //             "age": 18
        //         },
        //         {
        //             "name": "李四",
        //             "sex": 0,
        //             "age": 22
        //         },
        //         {
        //             "name": "妞妞",
        //             "sex": 1,
        //             "age": "19"
        //         }
        //     ]
        // };

        var data = {
            groups: [
                {id: 1, title: "group1"},
                {id: 2, title: "group2"},
            ],
            users: [
                {id: 1, login: "user1", groupId: 1, sex: 0},
                {id: 2, login: "user2", groupId: 2, sex: 1},
                {id: 3, login: "user3", groupId: 1, sex: 0}
            ],
            infos: [
                'a', 'b', 'c'
            ],
            info: {
                a: 1,
                b: 2,
                c: 3
            },
            person:{
                name: "亚里士朱德",
                blog: "https://baidu.com"
            }
        };


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

        Handlebars.registerHelper("agree_button", function () {
            console.log(arguments[0]);
            console.log(arguments[1]);
            console.log(arguments[1].hash);

        });

        Handlebars.registerHelper("button", function (p) {
            console.log('this是谁?'+this);
            console.log(p.name);
            console.log('判断是否恒等' + (p === this.person));
            var blog = Handlebars.escapeExpression(this.person.blog);
            var name = Handlebars.escapeExpression(this.person.name);


            return new Handlebars.SafeString(
                "<a href='" + blog + "'>" + name + "</a>"
            )
        });


        //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
        $('#tableList').html(myTemplate(data));
    });
});