import React from 'react';
import { ThemeContext } from "./theme-context";

function ThemeButton(props) {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <button
                    {...props}
                    style={{ background: theme.background }}>
                    </button>
            )}
        </ThemeContext.Consumer>
    )
}

export default ThemeButton;