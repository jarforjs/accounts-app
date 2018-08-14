define(function (require,exports,module) {
    require('mock');
    // console.log(Random.date('yyyy-MM-dd'));
    // 使用 Mock（全局变量）;可以模拟增 删 改 查
    Mock.setup({
        timeout: 500
    });
    Mock.mock('/paymentorder/paymentBillRpc/getExcell.json',{
        content:{
            retValue:{
                'data|21':[{
                    'date|+1': Mock.mock('@date("yyyy-MM-dd")'),//发布日期
                    'title|+1': Mock.mock('@title(50,100)'),//标题
                    'read|1':Mock.mock('@boolean()'),//是否已读,true已读,false未读
                }],
                'billDetailVoList|10-20': [{
                    'dealType|+1': ['贷款1','贷款2','贷款3'],//类型
                    'dealTime|+1':Mock.mock('@date("yyyy-MM-dd")'),//交易时间
                    'dealAmountStr|2000-10000.1-6':1,//交易金额
                    'principalStr|2000-10000.1-6':1,//正常本金
                    'interestStr|20-30.1-6':1,//正常利息
                    'overduePrincipalStr|2000-10000.1-6':1,//逾期本金
                    'overdueInterestStr|20-30.1-6':1,//逾期利息
                    'principalPenalityStr|2000-10000.1-6':1,//逾期本金罚息
                    'interestPenalityStr|2000-10000.1-6':1,//逾期利息罚息
                    'limitPercentStr|1':['36%','40%','28%'],//利息
                    'overLimitStr|0-1':1,//超出利息
                }],
            },
            count:21,
            isSuccess:true
        }
    });

    Mock.mock('/fileOperation/deleteFile.json',{
        content:{
            isSuccess:true
        }
    })
});


// define(function (require,exports,module) {
//     require('mock');
//     // console.log(Random.date('yyyy-MM-dd'));
//     // 使用 Mock（全局变量）;可以模拟增 删 改 查
//     Mock.setup({
//         timeout: 500
//     });
//     Mock.mock('/paymentorder/paymentBillRpc/getExcell.json',{
//         content:{
//             retValue:{
//                 selectTypeText:'蚂蚁金服-借呗',
//                 source:'collection_system',
//                 'percentValue|1':['24%','36%'],
//                 'morePercent':true,
//                 fileName:'20170407173053_data_result.xls',
//                 'loanOrganization|1': '软通科技有限公司',//放款机构
//                 'productName|1': '外包服务',//产品名称
//                 'loanDate|1': Mock.mock('@date("yyyy-MM-dd")'),//放款日
//                 'dueDate|1': Mock.mock('@date("yyyy-MM-dd")'),//到期日
//                 'overdueDays':Mock.mock('@integer(60, 100)'),//逾期天数
//                 'currency':'人民币',//币种
//                 'loanPrincipalStr|122.1-3':1,//贷款本金总额
//                 'debtPrincipalStr|122.1-3':1,//尚欠本金总额
//                 'overdueInterestStr':1,//逾期利息
//                 'interestStr':1,//正常利息
//                 'defaultInterestStr':1,//逾期罚息
//                 'dueFeeStr|2000-10000.1-6':1,//正常费用
//                 'overLimitStr|1-100.1-6':1,//尚欠本息费用
//                 'repaymentPeriod|1-6':1,//期数
//                 'billDetailVoList|10-20': [{
//                     'dealType|+1': ['贷款1','贷款2','贷款3'],//类型
//                     'dealTime|+1':Mock.mock('@date("yyyy-MM-dd")'),//交易时间
//                     'dealAmountStr|2000-10000.1-6':1,//交易金额
//                     'principalStr|2000-10000.1-6':1,//正常本金
//                     'interestStr|20-30.1-6':1,//正常利息
//                     'overduePrincipalStr|2000-10000.1-6':1,//逾期本金
//                     'overdueInterestStr|20-30.1-6':1,//逾期利息
//                     'principalPenalityStr|2000-10000.1-6':1,//逾期本金罚息
//                     'interestPenalityStr|2000-10000.1-6':1,//逾期利息罚息
//                     'limitPercentStr|1':['36%','40%','28%'],//利息
//                     'overLimitStr|0-1':1,//超出利息
//                 }],
//             },
//             isSuccess:true
//         }
//     });
//
//     Mock.mock('/fileOperation/deleteFile.json',{
//         content:{
//             isSuccess:true
//         }
//     })
// });