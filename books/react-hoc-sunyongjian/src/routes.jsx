import React from 'react';
import { Route } from 'react-router-dom';
import Usual from './components/simple/usual';
import Usual1 from './components/inheritance/usual';
import Login from './components/form/login';
import FuncContainer from './components/container/container-add-func';
import WrappedUsual from './components/container/hoc-usual';

//几种组件间通讯方式
import Parent2child from './components/pass-state/parent2child';
import Child2parentStateInParent from './components/pass-state/child2parentStateInParent';
import Child2parentStateInChild from './components/pass-state/child2parentStateInChild';
import CommonContainer from './components/pass-state/commonContainer/container';
import UseContext from './components/pass-state/useContext/context';

//react context
//1.dynamicContext
import DynamicContext from './components/context/dynamicContext/app'
import MultipleContext from './components/context/dynamicContext/multipleContext'
import EventEmitter from './components/pass-state/eventEmitter/conainer'

console.log(EventEmitter,'e')
const Routes = () => (
    <div>
        <Route exact path="/" render={() => <div>Welcome to</div>} />
        <Route path="/usual" component={Usual} />
        <Route path="/container" component={FuncContainer} />
        <Route path="/form" component={Login} />
        <Route path="/inheritance" component={Usual1} />
        <Route path="/hoc-usual" component={WrappedUsual} />
        {/* <Route path="/pass-state" component={Parent2child} /> */}
        {/* <Route path="/pass-state" component={Child2parentStateInParent} /> */}
        {/* <Route path="/pass-state" component={Child2parentStateInChild} /> */}
        {/* <Route path="/pass-state" component={CommonContainer} /> */}
        <Route path="/pass-state" component={UseContext} />
        {/* <Route path="/react-context" component={DynamicContext} /> */}
        <Route path="/react-context" component={MultipleContext} />
        <Route path="/event-emitter" component={EventEmitter} />
    </div>
);
export default Routes;
