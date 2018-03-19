// import React, {PropTypes} from 'react';
//
// //需要验证的属性
// // const propTypes = {
// //     name: PropTypes.string.isRequired,
// //     age: PropTypes.number.isRequired
// // };
//
// class Profile extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//             liked:0
//         };
//         this.likedCallback=this.likedCallback.bind(this);
//     }
//
//     likedCallback(){
//         let liked=this.state.liked;
//         liked++;
//         this.setState({
//             liked
//         });
//     }
//
//     //render是这个组件渲染的vitrual DOM结构
//     render() {
//         return (
//             <div className="profile-component">
//                 <h1>我的名字叫{this.props.name}</h1>
//                 <h2>我今年{this.props.age}岁</h2>
//                 <button onClick={this.likedCallback}>给我点赞</button>
//                 <h2>总点赞数:{this.state.liked}</h2>
//             </div>
//         )
//     }
// }
//
// //将验证赋值给这个组件的propType属性
// //Profile.propType = propTypes;
//
// export default Profile;

// import React from 'react';
//
// class Profile extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             liked:0
//         };
//         this.likedCallback=this.likedCallback.bind(this)
//     }
//     likedCallback(){
//         let liked=this.state.liked;
//         liked++;
//         this.setState({
//             liked
//         })
//     }
//     render(){
//         return(
//             <div>
//                 <h1>我的名字是{this.props.name}</h1>
//                 <h2>我今年{this.props.age}岁</h2>
//                 <button onClick={this.likedCallback}>给我点赞</button>
//                 <h2>总点赞数:{this.state.liked}</h2>
//             </div>
//         )
//     }
// }
//
// export default Profile;

// import React from 'react';
//
// class Profile extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             liked:0
//         };
//         this.likedCallback=this.likedCallback.bind(this);
//     }
//     likedCallback(){
//         let liked=this.state.liked;
//         liked++;
//         this.setState({
//             liked
//         })
//     }
//
//     render(){
//         return(
//             <div>
//                 <h4>我的名字叫{this.props.name}</h4>
//                 <h5>我今年{this.props.age}岁</h5>
//                 <button onClick={this.likedCallback}>给我点赞</button>
//                 <h4>总赞数{this.state.liked}</h4>
//             </div>
//         )
//     }
// }
//
// export default Profile;

// import React from 'react';
//
// class Profile extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             liked:0
//         };
//         this.likedCallback=this.likedCallback.bind(this)
//     }
//     likedCallback(){
//         let liked = this.state.liked;
//         liked++;
//         this.setState({
//             liked
//         })
//     }
//
//     componentDidMount(){
//         setTimeout(()=>{
//             this.likedCallback();
//         },1000)
//     }
//
//     render(){
//         return(
//             <div>
//                 <h4>my name is {this.props.name}.</h4>
//                 <h5>i am {this.props.age} years old.</h5>
//                 <button onClick={this.likedCallback}>give me five~</button>
//                 <h4>总赞数{this.state.liked}</h4>
//             </div>
//         )
//     }
// }
//
// export default Profile;

import React from 'react';
import Hobby from './Hobby';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: 0,
            hobbies: ['football', 'basketball']
        };
        this.likedCallback = this.likedCallback.bind(this);
        this.addHobbyCallback = this.addHobbyCallback.bind(this);
    }

    likedCallback() {
        let liked = this.state.liked;
        liked++;
        this.setState({
            liked
        })
    }

    addHobbyCallback() {
        let hobbyInput = this.refs.hobby,
            hobbyVal = hobbyInput.value;

        if (hobbyVal) {
            let hobbies = this.state.hobbies;
            hobbies = [...hobbies, hobbyVal];
            this.setState({
                hobbies
            }, () => {
                hobbyInput.value = '';
            })
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.likedCallback()
        }, 1000)
    }

    render() {
        return (
            <div>
                <h4>my name is {this.props.name}</h4>
                <h5>i am {this.props.age} years old</h5>
                <button onClick={this.likedCallback}>give me five</button>
                <h4>总赞数{this.state.liked}</h4>
                <ul>
                    {
                        this.state.hobbies.map((hobby, index) => <Hobby key={index} hobby={hobby}/>)
                    }
                </ul>
                <input type="text" ref="hobby"/>
                <button onClick={this.addHobbyCallback}>添加爱好</button>
            </div>
        )
    }
}

export default Profile;