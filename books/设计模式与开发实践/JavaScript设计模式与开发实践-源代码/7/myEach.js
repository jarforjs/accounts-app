var each = function(ary, callback){
  for(var i =0,len=ary.length;i<len;i++){
    callback.call(ary[i], i , ary[i])
  }
}

each([1, 2, 3], function(i, n){
  console.log(this, 'this')
  console.log([i, n]);
})


var reverseEach = function( ary, callback ){
  for ( var l = ary.length - 1; l >= 0; l-- ){
    callback( l, ary[ l ] );
  }
};

reverseEach( [ 0, 1, 2 ], function( i, n ){
  console.log( n ); // 分别输出：2, 1 ,0
});