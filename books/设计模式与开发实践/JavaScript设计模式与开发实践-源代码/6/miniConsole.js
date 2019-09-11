var miniConsole = {
  log: function(a, b){
    // 真正代码略
    console.log('outer 1')
    console.log('arguments', arguments)
    console.log( Array.prototype.join.call(arguments));
    // arguments.join();
  }
}
console.log('outer')