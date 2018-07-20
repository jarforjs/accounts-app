import React from 'react';

// 反向继承
const iiHoc = WrappedComponent => class extends WrappedComponent {
    render() {
        console.log(this.state, 'state');
        console.log(WrappedComponent.log())
        return super.render();
    }
};

export default iiHoc;