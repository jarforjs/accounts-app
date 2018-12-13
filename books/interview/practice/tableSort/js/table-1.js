/**
 * Created by Jeawon on 2016/4/20.
 */
//获取表格内的元素
var oTable = document.getElementById('tab');
var thead = oTable.tHead;
var headTr = thead.rows[0];//rows是行
var ths = headTr.cells;//单元格其实就是列，获取表头第一行里所有的列
var tbody = oTable.tBodies[0];//表格主体，一个表格可以有多个主体所以要用索引
var bodyTrs = tbody.rows;//表格主体所有行

//给表格动态绑定数据：1.通过ajax获取数据（async javascript and xml）

var xhr = new XMLHttpRequest();
xhr.open('get', 'ajaxData.txt', false);//打开这个请求对象：param1：请求方式；param2：请求接口(去后端同学那取数据)；param3：同步还是异步。true=async（异步不阻塞），false=同步阻塞
xhr.onreadystatechange = function () {//实时监听请求状态，当请求成功或者失败的时候，都会发生状态的改变，并且返回相应的状态码，我们通过状态码的值就知道是否请求成功。如果请求成功要做相应得对数据的处理。
    if (xhr.readyState == 4 && xhr.status == 200) {
        //console.log(xhr.responseText);//
        //result = xhr.responseText;//相当于添加了一个全局变量，也是window的属性
        result = eval(xhr.responseText);//相当于添加了一个全局变量，也是window的属性
    }
};
xhr.send(null);
//console.log(result);


//数据的动态绑定：把通过利用ajax获取过来的数据和我们的table表格绑定起来
function bindData() {//动态绑定数据
    var frg = document.createDocumentFragment();//创建一个文档碎片
    //循环的向文档碎片添加
    for (var i = 0; i < result.length; i++) {
        //debugger;
        //console.log(result[i]);
        var tr = document.createElement('tr');//给每一条数据都创建一个行
        //需要for in循环遍历数据中的属性个数，有多少个属性（name,age,hurt,sex）
        var cur = result[i];//cur每次循环时候的那个当前对象，也就是当前的那一组数据
        for (var key in cur) {//通过属性的个数循环创建列。每一个单元的html就是当前这个对象的属性值
            //console.log(key==='sex');
            var td = document.createElement('td');
            //处理性别这个列的innerHTML男女问题
            //curItem.sex = curItem.sex === 0 ? "男" : "女";
            /*if(cur['sex']===0){
             cur['sex']='男';
             }else if(cur['sex']===1){
             cur['sex']='女';
             }
             td.innerHTML = cur[key];*/
             /*if (key === "sex") {
             if (cur[key] == 0) {
             td.innerHTML = "女";
             } else {
             td.innerHTML = "男";
             }
             } else {
             td.innerHTML = cur[key];
             }*/
            //陈群海
            //key === "sex" ? td.innerHTML = cur[key] == 0 ? "女" : "男" : td.innerHTML = cur[key];
            //冀鹏宇
            key === "sex" ? cur[key] == 0 ? td.innerHTML = '女' : td.innerHTML = '男' : td.innerHTML = cur[key];//把cur[key]这个从数据中读到的属性值赋值给这个列的innerHTML
            //td.innerHTML = cur[key];//把cur[key]这个从数据中读到的属性值赋值给这个列的innerHTML
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    tbody.appendChild(frg);
    frg = null;
}
bindData();


/*
 * 隔行变色
 * */
function changeColor() {
    for (var i = 0; i < bodyTrs.length; i++) {
        bodyTrs[i].className = i % 2 ? 'bg' : null;
    }
}
changeColor();

//点击年龄实现排序
function sort() {//做到我们的排序了，按照你当前的点击的表头为依据排序
    //console.log(this);
    var ary = utils.listToArray(bodyTrs);
    //var ary = utils.listToArray(bodyTrs);
    //ary.sort(function(a,b))
    //alert();
    //如果想用sort方法，首先要保证是一个数组。点击的时候给tbody里的行排序。所以先把rows这个类数组转换为数组；
    var that = this;
    this.sortFlag *= -1;
    //需要处理每次点击过后不能把排序标识恢复问题
    for (var j = 0; j < this.length; j++) {
        if (ths[j] != this) {
            ths[j].sortFlag = -1;
        }
    }
    ary = ary.sort(function (a, b) {//给我们的数组排序，dom映射关系
        //a和b此时分别代表着什么？分别代表上下两行
        //而我们排列是按照每行里面所有列这个集合中点击那一列的innerHTML的内容区排序。别忘了还要把innerHTML获取来的字符串转化为数字
        if(isNaN(a.cells[that.index].innerHTML)||isNaN(b.cells[that.index].innerHTML)){
            return a.cells[that.index].innerHTML.localeCompare(b.cells[that.index].innerHTML)*that.sortFlag;
        }
        return (parseFloat(a.cells[that.index].innerHTML) - parseFloat(b.cells[that.index].innerHTML)) * that.sortFlag;//排列倒序如果每次在sort执行的时候，把return这个值乘以-1就行了
    });
    //我们把排好序的数组利用数据绑定重新放回到tbody里
    var frg = document.createDocumentFragment();//先创建一个文档碎片
    for (var i = 0; i < ary.length; i++) {//循环把已经排好序的数组的每一项（行）append到这个文档碎片中
        frg.appendChild(ary[i]);
    }
    tbody.appendChild(frg);
    frg = null;
}

//绑定点击事件
//给表头的每一列点击事件
for (var i = 0; i < ths.length; i++) {
    ths[i].index = i;//给每一个表头的列添加一个自定义属性，用来保存索引。点击的时候需要tbody里的行里的列按照这个索引的innerHTML去排序。
    ths[i].sortFlag = -1;

    ths[i].onclick = function () {
            //这里的this是你点击事件发生时候的那个元素
            //当每次点击事件发生时执行sort这个方法，sort方法中的this是window。但是我们排序要当前点击的表头排序，所以需要在sort方法中能娶到点击元素的这个this==》call
            sort.call(this);
            changeColor();//排完序了再重新执行各行排序
        }
}
/*
 var cursorThs = tab.getElementsByClassName('cursor');//我以后要把带cursor这个class的表头都可以做到点击排序。以后拓展成多列点击的时候，直接加一个cursor这个类就可以了
 for (var i = 0; i < cursorThs.length; i++) {//给每一个带cursor这个class的头都绑定点击排序的事件
 var cur = cursorThs[i];
 cur.onclick = function () {
 //this???是你当前点击表头单元格
 sort.call(this);//这个this是你当前点击的元素
 }
 }*/
