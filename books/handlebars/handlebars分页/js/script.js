(function ($) {

    $.ajaxSetup({
        error: function () {
            alert('接口调用失败');
            return false;
        }
    })

    var get_classes_url = "http://imoocnote.calfnote.com/inter/getClasses.php";
    var get_class_chapter_url = "http://imoocnote.calfnote.com/inter/getClassChapter.php";
    var get_class_note_url = "http://imoocnote.calfnote.com/inter/getClassNote.php";

    function refreshClasses(pageNum) {
        $.getJSON(get_classes_url, {curPage: pageNum}, function (data) {
            console.log(data);

            // 渲染课程信息
            renderTemplate("#class-template", data.data, "#classes");
            //渲染分页信息
            renderTemplate("#pag-template", formatPage(data), "#page");


        });
    }

    function bindPageEvent() {
        $("#page").delegate('li.clickable', 'click', function () {
            $this = $(this);
            var pageNum = $this.data('id');
            refreshClasses(pageNum);
        })


    }

    function bindClassEvent() {
        $("#classes").delegate('.innerbox', 'click', function () {
            $this = $(this);
            var cid = $this.data('id');
            console.log(cid);

            $.when(
                $.getJSON(get_class_chapter_url, {cid: cid}),
                $.getJSON(get_class_note_url, {cid: cid})
            ).done(function (data1, data2) {
                renderTemplate("#chapter-template", data1[0], ".chapterdiv");
                renderTemplate("#note-template", data2[0], "#notediv");
                showNote(true);
            });


        })
    }

    Handlebars.registerHelper('addOne', function (num) {
        return num + 1;
    });

    Handlebars.registerHelper('equals', function (str1, str2, options) {
        if (str1 === str2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    })

    function showNote(show) {
        if (show) {
            $(".overlap").css('display', 'block');
            $(".notedetail").css('display', 'block');
        } else {
            $(".overlap").css('display', 'none');
            $(".notedetail").css('display', 'none');
        }

    }

    $('.overlap').on('click', function () {
        showNote(false);
    })


    bindPageEvent();
    bindClassEvent();

    refreshClasses(1);

    function renderTemplate(templateSelector, data, htmlSelector) {
        var t = $(templateSelector).html();
        var f = Handlebars.compile(t);
        var h = f(data);
        $(htmlSelector).html(h);

    }


    function formatPage(pageData) {
        var pageArr = [];
        var totalPageNum = parseInt(pageData.totalCount);
        var curPageNum = parseInt(pageData.curPage);
        //处理到首页的逻辑
        var firstPage = {};
        firstPage.index = 1;
        firstPage.text = '&laquo;';
        if (curPageNum != 1) {
            firstPage.clickable = true;
        }
        pageArr.push(firstPage);

        // 处理到上一页的逻辑
        var prePage = {}
        prePage.index = curPageNum - 1;
        prePage.text = '&lsaquo;';
        if (curPageNum != 1) {
            prePage.clickable = true
        }


        pageArr.push(prePage);

        //处理到当前页的逻辑
        if (curPageNum <= 5) {
            for (var i = 1; i < curPageNum; i++) {
                var pag = {};
                pag.text = i;
                pag.index = i;
                pag.clickable = true;
                pageArr.push(pag);
            }
        } else {
            //如果 cur>5,那么 cur 前的页要显示...

            //加上首页
            var pag = {}
            pag.text = 1;
            pag.index = 1;
            pag.clickable = true;
            pageArr.push(pag);

            //加上...
            var pag = {};
            pag.text = '...';
            pageArr.push(pag);

            for (var i = curPageNum - 2; i < curPageNum; i++) {
                var pag = {};
                pag.text = i;
                pag.index = i;
                pag.clickable = true;
                pageArr.push(pag);
            }

        }

        // 处理当前页的逻辑
        var curPage = {};
        curPage.text = curPageNum;
        curPage.index = curPageNum;
        curPage.cur = true;
        pageArr.push(curPage);

        // 处理当前页之后的逻辑
        if (curPageNum >= totalPageNum - 4) {
            //当前页距离最大页小于4,全部显示
            for (var i = curPageNum + 1; i <= totalPageNum; i++) {
                var pag = {};
                pag.index = i;
                pag.text = i;
                pag.clickable = true;
                pageArr.push(pag);
            }
        } else {
            for (var i = curPageNum + 1; i <= curPageNum + 2; i++) {
                var pag = {};
                pag.text = i;
                pag.index = i;
                pag.clickable = true;
                pageArr.push(pag);
            }

            // 显示...
            var pag = {};
            pag.index = 0;
            pag.text = "...";
            pageArr.push(pag);

            // 显示最后一页
            var pag = {};
            pag.index = totalPageNum;
            pag.text = totalPageNum;
            pag.clickable = true;
            pageArr.push(pag);


        }

        // 下一页按钮
        var nextPage = {};
        nextPage.index = curPageNum + 1;
        nextPage.text = '&rsaquo;';
        if (curPageNum != totalPageNum) {
            nextPage.clickable = true;
        }
        pageArr.push(nextPage);

        // 最后一页按钮
        var lastPage = {};
        lastPage.index = totalPageNum;
        lastPage.text = "&raquo;";
        if (curPageNum != totalPageNum) {
            lastPage.clickable = true;
        }
        pageArr.push(lastPage);
        return pageArr;

    }

    Handlebars.registerHelper('formatDate', function (value) {
        if (!value) {
            return "";
        }
        var d = new Date(value);
        return d.getFullYear() + "-" + d.getMonth() + 1 + "-" + d.getDate()
            + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    })

})(jQuery)