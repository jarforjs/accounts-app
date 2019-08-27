import React from 'react'
import { ThemeContext } from './theme-context'

function ThemeButton(props) {
  console.log(props)
  return (
    <ThemeContext.Consumer>
      {({ theme }) =>
        <button {...props}
                style={{ background: theme.background, color: theme.color }}/>
      }
    </ThemeContext.Consumer>
  )
}

export default ThemeButton
