import React,{Component} from 'react';
import {render} from 'react-dom';
class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            liked:0,
            hobbies:['basketball','football','jump']
        };
        this.addLikedCallback=this.addLikedCallback.bind(this);
        this.addHobbyCallback=this.addHobbyCallback.bind(this);
    }

    addLikedCallback(){
        let liked=this.state.liked;
        liked++;
        this.setState({
            liked
        })
    }

    addHobbyCallback(){
        let addHobbyInput = this.refs.add,
            addHobbyInputValue=addHobbyInput.value;
        if(addHobbyInputValue){
            let hobbies=this.state.hobbies;
            hobbies=[...hobbies,addHobbyInputValue];
            this.setState({
                hobbies
            },()=>{
                addHobbyInput.value='';
            })
        }else{
            console.log('请输入爱好~')
        }
    }

    componentWillMount(){
        setTimeout(()=>{
            this.addLikedCallback()
        },1000)
    }

    render(){
        return(
            <div>
                <h5>my name is {props.name}</h5>
                <h4>i am {props.age} years old</h4>
                <button onClick={this.addLikedCallback}>give me five</button>
                <h4>have {this.state.liked} zan!</h4>
                <ul>
                    {
                        // this.state.hobbies.map((item,index)=><Hobbies hobby={item} key={index}/>)
                        this.state.hobbies.map((item,index)=>Hobbies(item,index))
                    }
                </ul>
                <input type="text" ref="add"/>
                <button onClick={this.addHobbyCallback}>添加爱好</button>
            </div>
        )
    }
}

// class Hobbies extends Component{
//     render(){
//         return(<li>{this.props.hobby}</li>)
//     }
// }

function Hobbies(hobby,index) {
    return (<li key={index}>{hobby}</li>)
}

let app =document.createElement('div');
document.body.appendChild(app);
const props={
    name:'jeawon',
    age:30
};
render(<Profile{...props}/>,app);