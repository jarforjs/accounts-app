/**
 * Created by Jeawon on 2016/4/25.
 */
//建立表格
var oTable = document.getElementById('tab');
var tHead = oTable.tHead;//表头
var tHs = tHead.rows[0].cells;//头行所有列
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
            console.log(key);
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
for (var i = 0; i < tHs.length; i++) {
    var cur = tHs[i];
    cur.index = i;
    cur.sortFlag = -1;
    cur.onclick = function () {
        sortTable.call(this, this.index);
    }
}

//表格排序
function sortTable(n) {
    var arr = utils.listToArray(bodyTrs);
    var _this = this;
    this.sortFlag *= -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] != this) {
            this[i].sortFlag = -1;
        }
    }
    arr.sort(function (a, b) {
        var curName = a.cells[n].innerHTML, nextName = b.cells[n].innerHTML;
        var curNumber = parseFloat(a.cells[n].innerHTML), nextNumber = parseFloat(b.cells[n].innerHTML);
        if (isNaN(curNumber) || isNaN(nextNumber)) {
            return curName.localeCompare(nextName) * _this.sortFlag;
        }
        return ((curNumber) - (nextNumber)) * _this.sortFlag;
    });
    var frg = document.createDocumentFragment();
    for (i = 0; i < arr.length; i++) {
        frg.appendChild(arr[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changeColor();
}