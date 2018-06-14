import React, { Component } from 'react';

export const themes = {
    light: {
        foreground: '#000000',//黑色
        background: '#eeeeee',//灰色
    },
    dark: {
        foreground: '#ffffff',//白色
        background: '#222222',//黑色
    },
}

export const ThemeContext = React.createContext({
    theme:themes.dark, // default value
    toggleTheme:()=>{}
});