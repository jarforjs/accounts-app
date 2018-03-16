/**
 * Created by Administrator on 2017-03-15.
 */
define(function (require, exports, module) {
    //require('jQuery');
    //require("http://www.w3school.com.cn/jquery/jquery.js");
    //require('reactAlibaba');
    //require('JSXTransformer');

    // var React = require("react");
    // var ReactDOM = require("reactDOM");





    $(function(){

        var tbody = "";

        //------------遍历数组 .each的使用-------------
        var anArray = ['one','two','three'];
        $("#result").html("------------遍历数组 .each的使用-------------");
        $.each(anArray,function(n,value) {

            alert(n+' '+value);
            var trs = "";
            trs += "<tr><td>" + n +"</td><td>" + value + "</td></tr>";
            tbody += trs;
        });

        $("#project").append(tbody);

    });





/*

    //导入整个模块的内容，其中一些被显式命名。
    //以下代码将myModule，foo，bar插入到当前作用域。注意，foo和myModule.foo是完全相同的，bar和myModule.bar也是如此。
    // import React,{Component,PropTypes} from 'react';
    // import ReactDOM from 'react-dom';
    class Person extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: props.name,
                age: 16
                //me:this

            }
        }

        //服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。如果在这个方法内调用 setState，render() 将会感知到更新后的 state，将会执行仅一次，尽管 state 改变了;
        componentWillMount() {
            this.setState({
                //name: 18
            });
            console.log('即将诞生');
        }

        //在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
        componentDidMount() {
            console.log('诞生完毕');
        }

        //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。老的 props 可以通过 this.props 获取到。在该函数中调用 this.setState() 将不会引起第二次渲染。
        componentWillReceiveProps(nextProps) {
            console.log('接收到新的 props');
            this.setState({
                name: nextProps.name
            }, function () {
                console.log('state 修改完毕')
            })
        }

        shouldComponentUpdate(nextProps, nextState) {
            return nextState.name !== this.state.name
        }

        //在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。使用该方法做一些更新之前的准备工作。
        componentWillUpdate() {
            console.log('即将更新视图')
        }

        //在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。使用该方法可以在组件更新之后操作 DOM 元素。
        componentDidUpdate() {
            console.log('视图更新完毕')
        }

        //在组件从 DOM 中移除的时候立刻被调用。在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素。
        componentWillUnmount() {
            console.log('卸载');
            //hello
        }

        render() {
            //let me = this;
            return (
                <div>
                    my name is {this.state.name}
                </div>
            )
        }
    }

    class App extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                name: 'react'
            }
        }


        changeNameHandler() {
            this.setState({
                name: '小红'
            })
        }

        unmount() {
            ReactDOM.unmountComponentAtNode(document.getElementById('App'))
        }

        render() {
            return (
                <div>
                    <Person name={this.state.name}/>
                    <button onClick={this.changeNameHandler.bind(this)}>更改名字</button>
                    <button onClick={this.unmount}>卸载</button>
                </div>
            )
        }
    }
// 使用 ReactDOM.render 方法将组件渲染到指定的 div 中，
// 在这个例子里是渲染到页面 `<div id="__react-content"></div>` 这个节点当中。
    ReactDOM.render(
        <App/>,
        document.getElementById('App')
    )
*/
});
