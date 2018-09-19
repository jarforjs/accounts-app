import React, { Component } from 'react';

const simpleHoc = WrappedComponent => {
    return class haha extends Component {

        render() {
            console.log(this.props, 'simpleHoc');
            
            const wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

            return <WrappedComponent {...this.props} />
        }
    }
}
export default simpleHoc;