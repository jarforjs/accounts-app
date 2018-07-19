class FancyButton extends React.Component {
    focus() {
        // ...
    }

    // ...
}

// Use context to pass the current "theme" to FancyButton.
// Use forwardRef to pass refs to FancyButton as well.
export default React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
        {theme => (
            <FancyButton {...props} theme={theme} ref={ref} />
        )}
    </ThemeContext.Consumer>
));

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

import FancyButton from './fancy-button';

const ref = React.createRef();

// Our ref will point to the FancyButton component,
// And not the ThemeContext.Consumer that wraps it.
// This means we can call FancyButton methods like ref.current.focus()
<FancyButton ref={ref} onClick={handleClick}>
    Click me!
  </FancyButton>;