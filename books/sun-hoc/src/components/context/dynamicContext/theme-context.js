import React from 'react'

export const themes = {
  red: {
    color: '#000000',
    background: 'red',
  },
  green: {
    color: '#ffffff',
    background: 'green',
  },
}

// default value
export const ThemeContext = React.createContext({
  theme: themes.green,
  toggleTheme: () => {},
})
