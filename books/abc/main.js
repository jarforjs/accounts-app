/**
 * Created by JetBrains WebStorm.F
 * User: wb-ghb226150@alibaba-inc.com
 * Date: 2017-09-20 15:03
 * Describe: 业务-版本更新信息中心
 */
define(function (require, exports, module) {
    console.log(module.id);
    require('./mock');
    require('./style.css');
    var Ajax = require('model/ajax/main'),
        Tab = require('model/tab/main'),
        MyWidget = require('common/myWidget'),
        SearchList = require('model/searchList/main');

    new (MyWidget.extend({
        attrs: {
            element: '#batchAppTable',
        },
        events: {
            'click [data-event="view"]': 'onCheck',
        },
        initProps: function () {
            var me = this;
            me.searchListExp = null;
            //me.dialogTmp = Handlebars.compile($(me.get('dialogTmp')).html());
        },
        setup: function () {
            console.log(13)
            var me = this;
            me.bindData();
        },
        bindData: function () {
            // 自然人法人切换
            new Tab({
                element: '#batchAppTable',
                menu: '[data-role="menu"]',
                list: '[data-role="list"]',
                active: 'focus',
                mainIndex: 0
            }).render();

            var me = this;
            if (!me.searchListExp) {
                me.searchListExp = SearchList.use('.searchList', {
                    map: function (data) {
                        return data.data;
                    },
                    //size: 2,
                    pageSizeList: [{value: 15, selected: true}, {value: 20}, {value: 30}],

                });
            } else {
                me.searchListExp[0].searchListReload();
            }
        },
        onCheck: function () {
            console.log('haha')
        }
    }))

});