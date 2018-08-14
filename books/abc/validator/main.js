/**
 * 选择接收人
 * 2017,12,4 张筱颖
 */
"use strict";
define(function(require, exports, module) {
    var Validator = require('common/validator'),
        Drag = require('model/drag/main');


    var app = Validator.use('#app');


    app.execute(function (isError, errList) {
        console.log(isError,errList);
    });

    new Drag({
        element:'#dragDiv'
    });
});