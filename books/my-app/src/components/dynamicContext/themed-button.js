import React, { Component } from 'react';

import { ThemeContext } from './theme-context';

function ThemedButton(props) {
    console.log(props)
    return (
        <ThemeContext.Consumer>
            {themes => (
                <button
                    {...props}
                    style={{ backgroundColor: themes.background }}
                />
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemedButton;