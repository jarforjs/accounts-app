//选项卡插件封装:只要选项卡结构一样,不管几个实现的思想都是一样的,唯一不一样的就是最外层的容器不一样
~(function () {
    /**
     * 封装一个选项卡插件,只要选项卡大结构一样,以后实现选项卡功能,只需要调取这个方法执行即可实现
     * @param container 当前要实现选项卡的这个容器
     * @param defaultIndex  默认选中项的索引
     */
    function tabChange(container, defaultIndex) {
        var tabFirst = utils.firstChild(container);
        var oLis = utils.children(tabFirst);
        var divList = utils.children(container, "div");
        console.log(tabFirst,'tabfirst');
        console.log(oLis,'olis');
        console.log(divList,'divlist');

        //让defaultIndex对应的页卡有选中的样式
        defaultIndex = defaultIndex || 0;
        utils.addClass(oLis[defaultIndex], "select");
        utils.addClass(divList[defaultIndex], "select");

        //实现具体的功能
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].onclick = function () {
                utils.addClass(this, "select");
                var curSiblings = utils.siblings(this);
                for (var i = 0; i < curSiblings.length; i++) {
                    utils.removeClass(curSiblings[i], "select");
                }
                var index = utils.index(this);
                for (i = 0; i < divList.length; i++) {
                    i === index ? utils.addClass(divList[i], "select") : utils.removeClass(divList[i], "select");
                }
            }
        }
    }

    window.zhuFengTab = tabChange;
})();
