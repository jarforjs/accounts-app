/**
 * Created by JetBrains WebStorm.
 * User: wb-ghb226150@alibaba-inc.com
 * Date: 2017-10-13 17:13
 * Describe:
 */
var googleMap = {
    show : function () {
        console.log('googleMap开始渲染地图');
    }
};

var baiduMap = {
    show : function () {
        console.log('baiduMap开始渲染地图');
    }
};

// var renderMap = function (type) {
//     // googleMap.show()
//     if(type ==='google'){
//         googleMap.show();
//     }else if(type === 'baidu'){
//         baiduMap.show();
//     }
// }
//
// renderMap('google');
// renderMap('baidu');

//优化后
var renderMap = function (map) {
    if(map.show instanceof Function){
        map.show();
    }
};

renderMap(googleMap);
renderMap(baiduMap);

var sosoMap = {
    show : function () {
        console.log('sosoMap开始渲染地图');
    }
};

renderMap(sosoMap);