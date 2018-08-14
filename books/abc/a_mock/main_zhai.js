/**
 * Created by wb-zlb276035 on 2017/8/1.
 */
define(function (require,exports,module) {
    var Ajax = require('model/ajax/main');

    var params = {"status":"allot_case","roleType":"trial_court","isDept":"true","isBatch":"y","key":"","type":"","causeAction":"","serialNumber":"","subStartTime":"","subEndTime":"","filStartTime":"","filEndTime":"","judgeEndStartTime":"","judgeEndEndTime":"","orderBy":"submitTime","sort":"desc","page":{"length":10,"begin":0}}

    new Ajax({
        request: "/court/CourtRpc/getCourtCaseList.json",
        paramName: "filterMap",
        param: params
    }).on('ajaxSuccess', function(rtv, msg, con){
        console.log(con)
    }).submit();
});