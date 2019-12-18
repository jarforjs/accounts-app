import React from 'react';
import styles from './Dustbin.css';
import classNames from 'classnames';

// http://www.php.cn/html5-tutorial-390195.html
class Dustbin extends React.Component {
  constructor() {
    super();
    this.state = {
      dustbinActive: false,
      innerHtml: '',
      dragList: [
        { id: 1, text: '列表1', src: '//image.zhangxinxu.com/image/study/s/s128/mm1.jpg' },
        { id: 2, text: '列表2', src: '//image.zhangxinxu.com/image/study/s/s128/mm2.jpg' },
        { id: 3, text: '列表3', src: '//image.zhangxinxu.com/image/study/s/s128/mm3.jpg' },
        { id: 4, text: '列表4', src: '//image.zhangxinxu.com/image/study/s/s128/mm4.jpg' },
      ],
    };
  }

  dragstart(e) {
    // e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('dragId', e.target.id);
    e.dataTransfer.setDragImage(e.target, 0, 0);
    return true;
  }
  dragover(e) {
    e.preventDefault();
    return true;
  }
  dustbinActive(flag) {
    this.setState({
      dustbinActive: flag,
    });
  }
  dragenter() {
    this.dustbinActive(true);
    return true;
  }
  dragleave() {
    this.dustbinActive(false);
    return true;
  }
  drop(e) {
    const dragId = e.dataTransfer.getData('dragId');
    const dragList = this.state.dragList.filter((item) => {
      if (item.id !== parseInt(dragId, 10)) {
        return item;
      } else {
        this.setState({
          innerHtml: item.text,
        });
        return false;
      }
    });
    if (dragId) {
      this.setState({
        dustbinActive: false,
        dragList,
      });
    }
    return false;
  }
  dragend(e) {
    e.dataTransfer.clearData('text');
    return false;
  }
  render() {
    const { dragList, dustbinActive, innerHtml } = this.state;
    const dustbinClass = classNames(
      styles.dustbin,
      { [styles.dustbinActive]: dustbinActive },
    );
    const dragListComponent = dragList.map((item, key) => {
      return (
        <div
          draggable
          key={key}
          id={item.id}
          className={styles.draglist}
          onDragStart={this.dragstart.bind(this)}
          onDragEnd={this.dragend.bind(this)}
        >
          {item.text}
        </div>);
    });

    return (
      <div>
        <div
          className={dustbinClass}
          onDragEnter={this.dragenter.bind(this)}
          onDragOver={this.dragover.bind(this)}
          onDragLeave={this.dragleave.bind(this)}
          onDrop={this.drop.bind(this)}
        >
          <br/>啦<br/>鸡<br/>捅
        </div>
        <div className={styles.dragbox}>
          {dragListComponent}
        </div>
        <div className={styles.dragremind}>
          {innerHtml && <div><strong>{innerHtml}</strong>被丢进垃圾桶。</div>}
        </div>
      </div>
    );
  }
}

export default Dustbin;
