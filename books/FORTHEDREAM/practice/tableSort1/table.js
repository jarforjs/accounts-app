var oTab = document.getElementById('tab');
var oHead = oTab.tHead;
var oThc = oHead.rows[0].cells;
var oBody = oTab.tBodies[0];
var oThs = oBody.rows;

var xhr = new XMLHttpRequest();
xhr.open('get', 'ajaxData.txt', false);
xhr.onreadystatechange = function () {
    //debugger;
    if (xhr.readyState == 4 && xhr.status == 200) {
        result = eval("(" + xhr.responseText + ")");
    }
};
xhr.send(null);
//console.log(result);

function bindData() {
    var fg = document.createDocumentFragment();
    for (var i = 0; i < result.length; i++) {
        var cur = result[i];
        var tr = document.createElement('tr');
        for (var key in cur) {
            var td = document.createElement('td');
            key === "sex" ? cur[key] === 0 ? td.innerHTML = "女" : td.innerHTML = "男" : td.innerHTML = cur[key];
            //td.innerHTML = cur[key];
            tr.appendChild(td);
        }
        fg.appendChild(tr);
        //console.log(fg);
    }
    oBody.appendChild(fg);
    fg = null;
}
bindData();

function changeColor() {
    for (var i = 0; i < oThs.length; i++) {
        oThs[i].className = i % 2 ? "bg" : void 0;
    }
}
changeColor();

oThc[1].onclick=function(){
    //oThc[1].index=-1;
    //console.log(this);
    sortTable();
}

function sortTable() {
    //var _this=this;
    //console.log(this);
    //_this.index*=-1;
    var arr = utils.listToArray(oThs);
    arr.sort(function (a, b) {
        return (parseFloat(a.cells[1].innerHTML) - parseFloat(b.cells[1].innerHTML));
    });
    var frg = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        frg.appendChild(arr[i]);
    }
    oBody.appendChild(frg);
    frg = null;
    changeColor();

}
//sortTable();

