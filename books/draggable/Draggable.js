import React from 'react';
import { connect } from 'dva';
// import styles from './Draggable.css';
import Dustbin from '../components/Draggable/Dustbin';
import VDraggable from '../components/VDraggable/VDraggable';
import DraggableComponentOld from '../components/Draggable/Draggable-old';
import MainLayout from '../components/MainLayout/MainLayout';

const value = [
  {
    code: 'v01',
    sort: 0,
  },
  {
    code: 'v02',
    sort: 1,
  },
  {
    code: 'v03',
    sort: 2,
  },
  {
    code: 'v05',
    sort: 4,
  },
  {
    code: 'v04',
    sort: 3,
  },
  {
    code: 'v07',
    sort: 6,
  },
  {
    code: 'v06',
    sort: 5,
  },
];
const value2 = [
  {
    code: 'e001',
    sort: 0,
  },
  {
    code: 'e002',
    sort: 1,
  },
  {
    code: 'e003',
    sort: 2,
  },
  {
    code: 'e005',
    sort: 5,
  },
  {
    code: 'e004',
    sort: 4,
  },
];

class Draggable extends React.Component {
  onChange(ee) {
    this.setState({ value: ee });
    console.log('ee', ee);
  }
  onChange2(ee) {
    this.setState({ value2: ee });
  }
  render() {
    const { location } = this.props;
    return (
      <MainLayout location={location}>
        <Dustbin />
        <DraggableComponentOld
          style={{ width: '100px', height: '100px', backgroundColor: 'green', position: 'absolute' }}
        />
        <VDraggable
          sortKey="sort"
          codeKey="code"
          value={value}
          onChange={this.onChange.bind(this)}
          style={{ width: '100px', height: '100px' }}
          render={item => (<div>{`${item.code}`}</div>)}
        />

        <VDraggable
          sortKey="sort"
          codeKey="code"
          isAcceptAdd
          value={value2}
          onChange={this.onChange2.bind(this)}
          style={{ width: '100px', height: '100px', marginTop: '120px' }}
          render={item => (<div>{`${item.code}`}</div>)}
        />
      </MainLayout>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Draggable);
