/**
 * Created by Administrator on 2016-11-18.
 */
define(function (require, exports, module) {
    require('jQuery');
    require('handlebars');
    require('_');
    require('bootstrap');

    $(document).ready(function () {
        //模拟的json对象
        var data = {
            "nav": [
                {
                    url:"http://baidu.com",title:"百度"
                },
                {
                    url:"http://google.com",title:"谷歌"

                }
            ],
            "list":[
                {
                    city:"美国",age:2000
                },
                {
                    city:"中国",age:5000
                }
            ]
        };



        //注册一个handlebars模板,通过id找到某一个模板,获取模板的html框架
        var template = Handlebars.compile($("#table-template").html());


        Handlebars.registerHelper('eval', function(str, options){
            //debugger;
            //匹配{{any character}}
            var reg = /\{\{.*?\}\}/g;
            var result = false;
            //["{{button}}", "{{abc}}", "{{cba}}"]
            //['{{index}}']
            var variables = str.match(reg);
            var context = this;
            //如果是each
            if(options.data){
                console.log(options);
                console.log(options.data.first);
                console.log(options.data.last);
                console.log(options.data.index);
                console.log(options.data.key);

                //一些默认变量，@first/@last 当该对象为数组中第一个/最后一个时返回真值。如果数组成员为值而非对象，@index表示当前索引值，可以用@key或者this获取当前值
                context.first = context.first||options.data.first;
                context.last = context.last||options.data.last;
                context.index = context.index||options.data.index;
                context.key = context.key||options.data.key;
            }
            _.each(variables, function(v,i){
                console.log(variables);
                console.log('v '+v,i);
                var key = v.replace(/{{|}}/g,"");
                //index
                console.log(key);
                //number
                console.log(typeof context[key]);
                var value = typeof context[key]==="string"?('"'+context[key]+'"'):context[key];
                console.log('context[key] '+context[key]);
                console.log('v,value '+v,value);
                console.log('str1 '+str);
                //v={{index}},value=0
                str = str.replace(v, value);
                console.log('str2 '+str);
            });
            try{
                result = eval(str);
                console.log('result '+result);
                return new Handlebars.SafeString(result);
            }catch(e){
                console.log(str,'--Handlerbars Helper "eval" deal with wrong expression!');
                return new Handlebars.SafeString('');
            }
        });


        Handlebars.registerHelper("list",function (context, options) {
            var ret="<ul>";
            for(var i=0,j=context.length;i<j;i++){
                ret=ret+"<li>"+options.fn(context[i])+"</li>";
            }
            return ret+"</ul>";
        });




        Handlebars.registerHelper('ex',function (str, options) {
            var reg=/\{\{.*?\}\}/g;
            var result=false;
            var variables=str.match(reg);
            console.log('ex '+variables);
            var context=this;
            _.each(variables,function (v) {
                var key=v.replace(/\{\{|\}\}/g,'');
                console.log('ex '+key);//==>key=state
                var value=typeof context[key]==='string'?('"'+context[key]+'"'):context[key];
                console.log('ex '+value);
                str=str.replace(v,value);
                console.log('ex '+str);
            });
            try{
                //undefined==='su'
                result=eval(str);
                console.log('ex '+result);//==>false
                if(result){
                    return options.fn(this);
                }else{
                    return options.inverse(this);
                }
            }catch(e){
                console.log(str,'--Handlerbars Helper "ex" deal with wrong expression!');
                return options.inverse(this);
            }
        });

        //将json对象用刚刚注册的handlebars模板封装,得到最终的html,插入到基础table中
        $('#tableList').html(template(data));
    })
});