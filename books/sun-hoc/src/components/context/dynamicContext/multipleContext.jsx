import React, { Component } from 'react';

// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
    name: 'Guest',
});

export default class App extends Component {
    render() {
        console.log(this,'this');
        console.log(this.props,'props');
        const { signedInUser, theme } = this.props;

        // App component that provides initial context values
        return (
            // <ThemeContext.Provider value={theme}>
            //     <UserContext.Provider value={signedInUser}>
                    <Content />
            //     </UserContext.Provider>
            // </ThemeContext.Provider>
        );
    }
}

// A component may consume multiple contexts
function Content() {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <UserContext.Consumer>
                    {user => (
                        <div user={user} theme={theme}>{theme}-{user.name}</div>
                    )}
                </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
    );
}