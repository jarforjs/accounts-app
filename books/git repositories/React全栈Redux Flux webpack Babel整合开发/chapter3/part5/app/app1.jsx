// import React from 'react';
// import ReactDOM from 'react-dom';

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className="container2">

//                 <h1 className="court00">hello react!!</h1>
//                 <h1>hello react!!</h1>
//                 <h1>hello react!!</h1>
//                 <h1>hello react!!</h1>
//             </div>
//         )
//     }
// }

// // function App() {
// //     return(
// //         <div className="container">
// //             <h1>hello react!</h1>
// //         </div>
// //     )
// // }

// const app = document.createElement('div');
// document.body.appendChild(app);
// ReactDOM.render(<App/>, app);


import React from 'react';
import {render} from 'react-dom';
// import Profile from '../components/Profile';
// import Profile from './Profile';

const props = {
    name: 'jeawon gu',
    age: 30
};

const app = document.createElement('div');
document.body.appendChild(app);


render(<SimpleSlider/>, app);