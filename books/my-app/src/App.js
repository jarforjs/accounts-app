// import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React!</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';
import {ThemeContext,themes} from './components/dynamicContext/theme-context'
// import ThemedButton from './components/dynamicContext/themed-button'
//Updating Context from a Nested Component
import ThemeTogglerButton from './components/dynamicContext/theme-toggler-button'

// An intermediate component that uses the ThemedButton
// function Toolbar(props) {
//     return(
//         <ThemedButton onClick={props.changeTheme}>
//             Change Theme
//         </ThemedButton>
//     )
// }

class App extends Component{
    constructor(props){
        super(props);
        
        this.toggleTheme=()=>{
            this.setState(state=>({
                theme:state.theme === themes.dark?themes.light:themes.dark
            }))
        }

        //State also contains the updater function so it will be passed down into the context provider
        this.state={
            theme:themes.light,
            toggleTheme:this.toggleTheme
        }

    }

    render(){
        // return(
        //     <div>
        //         <ThemeContext.Provider value={this.state.theme}>
        //             <Toolbar changeTheme={this.toggleTheme} />
        //         </ThemeContext.Provider>
        //         <section>
        //             <ThemedButton>
        //                 button
        //             </ThemedButton>
        //         </section>
        //     </div>
        // )
        return(
            <ThemeContext.Provider value={this.state}>
                <Content />
            </ThemeContext.Provider>
        )
    }
}

function Content(){
    return(
        <div>
            <ThemeTogglerButton />
        </div>
    )
}
export default App;
