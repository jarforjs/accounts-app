import React from 'react';

export const themes = {
    light: {
        color: '#000000',
        background: '#eeeeee'
    },
    dark: {
        color: '#ffffff',
        background: '#222222'
    }
}

//default value
export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}
})