import React from 'react';
import { Row, Col, Form, Input, Button, Select, DatePicker, Table } from 'antd';
import { connect } from 'dva';
import FiveStarDraggable from '../../../components/FiveStarDraggable/FiveStarDraggable';


@connect(({ vicCoupon }) => ({ vicCoupon }))
class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [
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
          sort: 5,
        },
        {
          code: 'v04',
          sort: 4,
        },
        {
          code: 'v07',
          sort: 7,
        },
        {
          code: 'v06',
          sort: 6,
        },
      ],
      value2: [
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
      ],
    };
  }
  onChange(ee) {
    this.setState({ value: ee });
    console.log('ee', ee);
  }
  onChange2(ee) {
    this.setState({ value2: ee });
  }
  render() {
    return (
      <Row style={{ marginTop: '200px' }}>
        <FiveStarDraggable
          sortKey="sort"
          codeKey="code"
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          style={{ width: '100px', height: '100px' }}
          render={item => (<div>{`${item.code}`}</div>)}
        />

        <FiveStarDraggable
          sortKey="sort"
          codeKey="code"
          isAcceptAdd
          value={this.state.value2}
          onChange={this.onChange2.bind(this)}
          style={{ width: '100px', height: '100px', marginTop: '120px' }}
          render={item => (<div>{`${item.code}`}</div>)}
        />
      </Row>

    );
  }
}
export default Form.create()(CouponList);
