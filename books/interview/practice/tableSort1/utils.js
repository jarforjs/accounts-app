var utils={
    listToArray:function(likeArray){
        var arr=[];
        try{
            arr=Array.prototype.slice.call(likeArray);
        }catch (e){
            arr=[];
            for(var i=0;i<likeArray.length;i++){
                arr.length[i]=likeArray[i];
            }
        }
        return arr;
    },
    jsonParse:function(jsonStr){
        return "JSON" in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
    }
};