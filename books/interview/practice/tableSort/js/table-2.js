/**
 * Created by Jeawon on 2016/4/25.
 */
//建立表格
var oTable = document.getElementById('tab');
var tHead = oTable.tHead;//表头
var headTr = tHead.rows[0];//头行
var ths = headTr.cells;//头行所有列
var tBody = oTable.tBodies[0];//表格的body
var bodyTrs = tBody.rows;//tBody中所有列

//建立ajax连接
var xhr = new XMLHttpRequest();
xhr.open('get', 'ajaxData.txt', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        result = utils.jsonParse(xhr.responseText);
    }
};
xhr.send(null);

//绑定数据
function bindData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');
        var cur = result[i];
        for (var key in cur) {
            var td = document.createElement('td');
            key === "sex" ? cur[key] == 0 ? td.innerHTML = '女' : td.innerHTML = '男' : td.innerHTML = cur[key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bindData();

//隔行变色
function changeColor() {
    for (var i = 0; i < bodyTrs.length; i++) {
        bodyTrs[i].className = i % 2 ? 'bg' : null;
    }
}
changeColor();

//创建点击事件
for (var i = 0; i < ths.length; i++) {
    var cur = ths[i];
    cur.index = i;
    cur.sortFlag = -1;
    cur.onclick = function () {
        sortTable.call(this);
    }
}

//表格排序
function sortTable() {
    var ary = utils.listToArray(bodyTrs);
    var that = this;
    this.sortFlag *= -1;
    for (var i = 0; i < ths.length; i++) {
        var cur = ths[i];
        if (cur != this) {
            cur.sortFlag = -1;
        }
    }
    ary.sort(function (a, b) {
        if (isNaN(a.cells[that.index].innerHTML) || isNaN(b.cells[that.index].innerHTML)) {
            return a.cells[that.index].innerHTML.localeCompare(b.cells[that.index].innerHTML) * that.sortFlag;
        }
        return (parseFloat(a.cells[that.index].innerHTML) - parseFloat(b.cells[that.index].innerHTML)) * that.sortFlag;
    });
    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changeColor();
}