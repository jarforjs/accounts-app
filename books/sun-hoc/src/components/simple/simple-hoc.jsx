import React, { Component } from 'react';

const simpleHoc = (WrappedComponent) => class haha extends Component {

      componentDidMount() {
          console.log('simple')
        }
      render() {
          console.log(this.props, 'simpleHoc');
            
          const wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

          return <WrappedComponent {...this.props} />
        }
    };
export default simpleHoc;
