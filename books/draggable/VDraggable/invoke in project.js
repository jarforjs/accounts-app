import React from 'react';
import { Row, Col, Form, Upload, Modal, Icon, Button } from 'antd';
import { connect } from 'dva';
import FiveStarDraggable from '../../../components/FiveStarDraggable/FiveStarDraggable';


@connect(({ vicCoupon }) => ({ vicCoupon }))
class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        pictureTypeEnum: 'DETAILS',
        size: 100,
        width: '100',
        height: '10',
        format: 'jpg',
        colorModel: 'red',
        sort: 0,
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
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
    };
  }
  onChange(ee) {
    this.setState({ value: ee });
    console.log('ee', ee);
  }
  onChange2(ee) {
    console.log('eee', ee);
    this.setState({ fileList: ee });
  }
  handleChange({ fileList }) {
    const sortFiles = fileList.filter(citem => !isNaN(citem.sort));
    const maxSort = Math.max(...sortFiles.map(pitem => pitem.sort));
    const newFileList = fileList.map((item) => {
      if (item.response && item.response.data && item.response.data.imageInfo) {
        item.sort = item.sort && !isNaN(item.sort) ? item.sort : parseInt(maxSort, 10) + 1;
        item.url = item.response.data.url;
        item.size = JSON.parse(item.response.data.imageInfo).size;
        item.format = JSON.parse(item.response.data.imageInfo).format;
        item.width = JSON.parse(item.response.data.imageInfo).width;
        item.height = JSON.parse(item.response.data.imageInfo).height;
        item.colorModel = JSON.parse(item.response.data.imageInfo).colorModel;
      }
      return item;
    });
    this.setState({ fileList: newFileList });
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Button icon="upload" type="dashed" style={{ height: '100px', width: '100px' }} />
      </div>
        );
    return (
      <Row style={{ marginTop: '20px' }}>
        {/* <FiveStarDraggable sortKey="sort"
                    codeKey="code"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    style={{ width: '100px', height: '100px' }}
                    render={item => (<div>{`${item.code}`}</div>)} /> */}

        {/* <FiveStarDraggable sortKey="sort"
                    codeKey="code"
                    isAcceptAdd={true}
                    value={this.state.value2}
                    onChange={this.onChange2.bind(this)}
                    style={{ width: '100px', height: '100px', marginTop: '120px' }}
                    render = {item => (<div>{`${item.code}`}</div>)} /> */}
        <div style={{ display: 'flex', direction: 'row' }}>
          <FiveStarDraggable
            sortKey="sort"
            codeKey="url"
            value={fileList}
            onChange={this.onChange2.bind(this)}
            style={{ width: '100px', height: '100px' }}
            render={item => (
              <img key={item.url} src={item.url || item.thumbUrl} height="80px" width="80px" alt={item.name} />
                        )}
          />
          <Upload
            headers={{ Authorization: 'Bearer 20c43423-627d-44e7-bad5-119d1444e6ed' }}
            action="/api/v3/common/upload/skuPic/"
            fileList={fileList}
            onChange={this.handleChange.bind(this)}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          {/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal> */}
        </div>
      </Row >

    );
  }
}
export default Form.create()(CouponList);
