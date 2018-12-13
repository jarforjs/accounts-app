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

        //让defaultIndex对应的页卡有选中的样式
        defaultIndex = defaultIndex || 0;
        utils.addClass(oLis[defaultIndex], "select");
        utils.addClass(divList[defaultIndex], "select");

        //使用事件委托来优化我们的点击操作
        tabFirst.onclick = function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            //说明当前点击的是LI标签
            if (e.target.tagName.toUpperCase() === "LI") {
                concrete.call(e.target,oLis,divList)
            }
        }
    }

    function concrete(oLis, divList) {
        //只要保证this是当前点击的LI
        var index = utils.index(this);
        utils.addClass(this, "select");

        for (var i = 0; i < oLis.length; i++) {
            i === index ? utils.addClass(divList[i], "select") : (utils.removeClass(oLis[i], "select"), utils.removeClass(divList[i], "select"));
        }
    }

    window.zhuFengTab = tabChange;
})();
