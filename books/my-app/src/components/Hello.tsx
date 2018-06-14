import * as React from 'react';
import './Hello'
export interface Props{
    name:string;
    enthusiasmLevel?:number
}

function Hello({name,enthusiasmLevel =1}:Props){
    if(enthusiasmLevel<=0){
        throw new Error('You could be a litle more enthusiastic. :D')
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name +getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>
    )
}

export default Hello;

//helpers
function getExclamationMarks(numChars:number) {
    return Array(numChars+1).join('!');
}

//类的写法：Classes are useful when our component instances have some state.
// class Hello extends React.Component<Props,object>{
//     render(){
//         const {name,enthusiasmLevel=1}=this.props;
//         if(enthusiasmLevel<=0){
//             throw new Error('You could be a litle more enthusiastic. :D')
//         }
//         return (
//             <div className="hello">
//                 <div className="greeting">
//                     Hello {name +getExclamationMarks(enthusiasmLevel)}
//                 </div>
//             </div>
//         )
//     }
// }
