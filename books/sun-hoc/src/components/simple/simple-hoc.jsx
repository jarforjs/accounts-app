import React, { Component } from 'react';

const simpleHoc = WrappedComponent => {
    return class extends Component {

        render() {
            console.log(this.props, 'simpleHoc');

            return <WrappedComponent {...this.props} />
        }
    }
}
export default simpleHoc;