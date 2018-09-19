import React, { Component } from 'react';

//换一种写法，在构造器里获得对被包裹组件的ref引用
// const refHoc = WrappedComponent => class extends Component {

//     componentDidMount() {
//         console.log(this.instanceComponent, 'instanceComponent');
//     }

//     render() {
//         return (<WrappedComponent
//             {...this.props}
//             ref={instanceComponent => this.instanceComponent = instanceComponent}
//         />);
//     }
// };
// export default refHoc;

const refHoc = WrappedComponent => class extends Component {
    constructor() {
        super(...arguments);
        this.linkRef = this.linkRef.bind(this)
    }

    linkRef(wrappedInstance) {
        this._root = wrappedInstance;
    }

    componentDidMount() {
        console.log(this._root, 'wrappedInstance');
    }

    render() {
        const props = { ...this.props, ref: this.linkRef };
        return <WrappedComponent {...props} />
    }
}

export default refHoc;
