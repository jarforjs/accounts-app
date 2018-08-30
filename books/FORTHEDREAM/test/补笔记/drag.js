function down(e) {//把down发布为一个事件:就是把这个行为的发生写成一个让别人能够预定的表示符
    //"selfDragStart"
    this.x=this.offsetLeft;
    this.y=this.offsetTop;
    this.mx=e.pageX;
    this.my=e.pageY;
    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up);
    }else{
        this.MOVE=processThis(this,move);
        this.UP=processThis(this,up);
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    //阻止DIV1内的图片默认选中样式
    e.preventDefault();
    fire.call(this,"selfDragStart",e);
}
function move(e) {
    this.style.left=this.x+(e.pageX-this.mx)+"px";
    this.style.top=this.y+(e.pageY-this.my)+"px";
    fire.call(this,"selfDragging",e);

}

function up(e) {
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,"mousemove",move);
        off(this,"mouseup",up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    //fly.call(this);
    //drop.call(this);
    fire.call(this,"selfDragEnd",e);
}
