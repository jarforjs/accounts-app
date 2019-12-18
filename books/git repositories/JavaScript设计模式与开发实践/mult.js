/**
 * Created by JetBrains WebStorm.
 * User: wb-ghb226150@alibaba-inc.com
 * Date: 2018-01-03 16:47
 * Describe:
 */
var report = (function(){
    var imgs = [];
    return function( src ){
        var img = new Image();
        imgs.push( img );
        img.src = src;
    }
})();

report('baidu.com');