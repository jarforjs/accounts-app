var oTable=document.getElementById('tab');
var oHead=oTable.tHead;
var oThc=oHead.rows[0].cells;
var oBody=oTable.tBodies[0];
var oThs=oBody.rows;

var xhr=new XMLHttpRequest();
var result=null;
xhr.open('get','ajaxData.txt',false);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
        result=utils.jsonParse(xhr.responseText)
    }
};
xhr.send();
console.log(result);

function bindData(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<result.length;i++){
        var cur=result[i];
        var tr=document.createElement('tr');
        for(var key in cur){
            var td=document.createElement('td');
            key==='sex'?cur[key]=='0'?td.innerHTML='女':td.innerHTML='男':td.innerHTML=cur[key];
            tr.appendChild(td);
        }
        frg.appendChild(tr);
    }
    oBody.appendChild(frg);
    frg=null;
}
bindData();

function changeColor(){
    for(var i=0;i<oThs.length;i++){
        oThs[i].className=i%2?'bg':void 0;
    }
}
changeColor();

function sortTable(n){
    for(var i=0;i<oThc.length;i++){
        if(oThc[i]!=this){
            oThc[i].flag=-1;
        }
    }
    this.flag*=-1;
    var _this=this;
    var arr=utils.listToArray(oThs);

    arr.sort(function(a,b){
        var first= a.cells[n].innerHTML;
        var second= b.cells[n].innerHTML;
        if(isNaN(first)||isNaN(second)){
            return first.localeCompare(second)*_this.flag;
        }
        return (parseFloat(first)-parseFloat(second))*_this.flag;
    });
    var frg=document.createDocumentFragment();
    for(var i=0;i<arr.length;i++){
        frg.appendChild(arr[i]);
    }
    oBody.appendChild(frg);
    frg=null;
    changeColor();
}

for(var i=0;i<oThc.length;i++){
    var cur=oThc[i];
    cur.flag=-1;
    cur.index=i;
    cur.onclick=function(){
        sortTable.call(this,this.index)
    }
}