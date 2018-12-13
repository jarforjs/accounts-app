/*
 * @file app main file
 */

import 'babel-polyfill';
import 'bootstrap/scss/bootstrap.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Deskmark from 'components/Deskmark';

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Deskmark />, app);
// 所属法院	courtId
// 所属部门	deptId
// 岗位		station
// 角色		roleId
// 1.4.8		迭五2-法官助理
// 1.4.7		福田紧急系列案
// 1.4.1		迭五1-更新送达方式
// 1.4.10		迭六-订单关联&证据优化