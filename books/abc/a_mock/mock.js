/**
 * Created by wb-zlb276035 on 2017/8/8.
 */
define(function (require,exports,module) {
    require('mock');
    // 使用 Mock（全局变量）;可以模拟增 删 改 查
    Mock.mock('/court/CourtRpc/getCourtCaseList.json',{
        content:{
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1-10': [{
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'id|+1': 1
            }],
            isSuccess:true
        }
    });

    //API->https://github.com/nuysoft/Mock/wiki/Syntax-Specification
    // 输出结果
    //console.log(JSON.stringify(data, null, 4))
});