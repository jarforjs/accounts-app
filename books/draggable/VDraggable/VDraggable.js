import React, { Component } from 'react';
import * as styles from './draggable.less';

export default class VDraggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uId: this.guid(),
    };
  }

  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  guid() {
    return (`${this.S4() + this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`);
  }

  // 拖动事件
  dragStart = (sort, code, uId, item, e) => {
    e.dataTransfer.setData('sort', sort);
    e.dataTransfer.setData('code', code);
    e.dataTransfer.setData('uId', uId);
    e.dataTransfer.setData('item', JSON.stringify(item));
  };
    // 拖动后鼠标进入另一个可接受区域
  dragenter = (e) => {
    if (e.target.className.indexOf('droppedcontent') !== -1) {
      e.target.className = styles.droppingContent;
    }
  };

  // a拖到b，离开b的时候触发
  dragleave = (e) => {
    if (e.target.className.indexOf('droppingContent') !== -1) {
      e.target.className = styles.droppedcontent;
    }
  };

  // 对象排序 sortKey = sort
  compare = sortKey => (obj1, obj2) => {
    if (obj1[sortKey] < obj2[sortKey]) {
      return -1;
    } else if (obj1[sortKey] > obj2[sortKey]) {
      return 1;
    }
    return 0;
  };

  // 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
  drop = (dropedSort, data, sortKey, dropedUid, codeKey, e) => {
        // console.log('释放的时候e', e)
    e.preventDefault();
    const code = e.dataTransfer.getData('code');
    const uId = e.dataTransfer.getData('uId');
    const dragedItem = e.dataTransfer.getData('item');
    const sort = e.dataTransfer.getData('sort');
    if (uId === dropedUid) {
      if (sort < dropedSort) {
        data.map((item) => {
          if (item[codeKey] === code) {
            item[sortKey] = dropedSort;
          } else if (item[sortKey] > sort && item[sortKey] < dropedSort + 1) {
            item[sortKey]--;
          }
          return item;
        });
                // e.target.before(document.getElementById(code))
      } else {
        data.map((item) => {
          if (item[codeKey] === code) {
            item[sortKey] = dropedSort;
          } else if (item[sortKey] > dropedSort - 1 && item[sortKey] < sort) {
            item[sortKey]++;
          }
          return item;
        });
                // e.target.after(document.getElementById(code))
      }
    } else if (this.props.isAcceptAdd) {
      const objDragedItem = JSON.parse(dragedItem);
      if (data.filter(item => item[codeKey] === objDragedItem[codeKey]).length === 0) {
        const maxSort = Math.max(...data.map(citem => citem[sortKey]));
        data.map((item) => {
          if (dropedSort === maxSort) {
            objDragedItem[sortKey] = dropedSort + 1;
          } else if (item.sort > dropedSort) {
            objDragedItem[sortKey] = dropedSort + 1;
            item[sortKey]++;
          }
          return item;
        });
        data.push(objDragedItem);
      }
    }
    this.props.onChange(data);
    if (e.target.className.indexOf('droppingContent') !== -1) {
      e.target.className = styles.droppedcontent;
    }
  }

  dragOver= (e) => {
    e.preventDefault();
  };

  // 生成拖拽组件
  createDragComponent = (value, sortKey, style, uId, render, codeKey) =>
    // sortKey="sort"
    // codeKey="code"
    value.sort(this.compare(sortKey)).map(item =>
      <div
        className={styles.droppedcontent}
        key={item[codeKey]}
        draggable
        onDragEnter={this.dragenter.bind(this)}
        onDragLeave={this.dragleave.bind(this)}
        onDragStart={this.dragStart.bind(this, item[sortKey], item[codeKey], uId, item)}
        onDrop={this.drop.bind(this, item[sortKey], value, sortKey, uId, codeKey)}
        onDragOver={this.dragOver.bind(this)}
        style={{ ...style }}
      >{render(item)}</div>);

  render() {
    const { value, sortKey, style, render, codeKey } = this.props;
    const { uId } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {this.createDragComponent(value, sortKey, style, uId, render, codeKey)}
        </div>
      </div>
    );
  }
}

