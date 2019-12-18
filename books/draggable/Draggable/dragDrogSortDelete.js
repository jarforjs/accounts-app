import React from 'react';
import classNames from 'classnames';
// import { List, fromJS, is } from 'immutable';
import { message } from 'antd';
import styles from './dragDrogSortDelete.css';

class DragDrogSortDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originList: [
        { id: 1, smallSrc: '//image.zhangxinxu.com/image/study/s/s128/mm1.jpg', bigSrc: '//image.zhangxinxu.com/image/study/s/s512/mm1.jpg', alt: '模块占位符1' },
        { id: 2, smallSrc: '//image.zhangxinxu.com/image/study/s/s128/mm2.jpg', bigSrc: '//image.zhangxinxu.com/image/study/s/s512/mm2.jpg', alt: '模块占位符2' },
        { id: 3, smallSrc: '//image.zhangxinxu.com/image/study/s/s128/mm3.jpg', bigSrc: '//image.zhangxinxu.com/image/study/s/s512/mm3.jpg', alt: '模块占位符3' },
        { id: 4, smallSrc: '//image.zhangxinxu.com/image/study/s/s128/mm4.jpg', bigSrc: '//image.zhangxinxu.com/image/study/s/s512/mm4.jpg', alt: '模块占位符4' },
      ],
      targetList: [],
      moduleEnterClass: false,
      moduleOverClass: false,
      modulePlaHdClass: false,
    };
  }

  dragstart(e) {
    e.dataTransfer.setData('DragId', e.target.id);
    if (e.target.dataset.except === 'true') {
      this.setState({
        moduleEnterClass: !this.state.moduleEnterClass,
      });
    }
  }
  toggleClass(target, flag) {
    this.setState({
      [target]: flag,
    });
  }
  // todo: 类型没有区分 moduleRemove
  dragenter(e) {
    console.log(e.target.id === 'moduleRemove' && this.state.moduleEnterClass, this.state.moduleOverClass, 'moduleOverClass')
    if (e.target.id === 'moduleRemove' && this.state.moduleEnterClass) {
      this.setState({
        moduleOverClass: true,
      });
    }
    if (e.target.id === 'modulePlaHd') {
      this.toggleClass('modulePlaHdClass', !this.state.modulePlaHdClass);
    }
  }
  dragover(e) {
    e.preventDefault();
  }
  dragleave(e) {
    // if (e.target.id !== 'moduleRemove' && this.state.moduleEnterClass) {
    //   this.setState({
    //     moduleOverClass: false,
    //   });
    // }
    if (e.target.id === 'modulePlaHd') {
      this.toggleClass('modulePlaHdClass', !this.state.modulePlaHdClass);
    }
  }
  drop(e) {
    const { targetList, originList } = this.state
    const dragId = e.dataTransfer.getData('DragId');
    if (!targetList.filter(node => node.id === parseInt(dragId, 10)).length) {
      const dragEle = originList.filter(node => node.id === parseInt(dragId, 10));
      this.setState({
        targetList: [...targetList, ...dragEle],
      });
    }
    this.setState({
      modulePlaHdClass: !this.state.modulePlaHdClass,
    })
    e.preventDefault();
  }
  dragend(e) {
    if (e.target.dataset.except === 'true') {
      this.setState({
        moduleEnterClass: false,
      });
    }
    e.dataTransfer.clearData();
    e.preventDefault();
  }
  render() {
    const {
      targetList,
      originList,
      moduleEnterClass,
      moduleOverClass,
      modulePlaHdClass,
    } = this.state;

    const removeClass = classNames(
      styles.moduleRemove,
      { [styles.dragenter]: moduleEnterClass },
      { [styles.dragover]: moduleOverClass },
    );

    const plaHdClass = classNames(
      styles.modulePlaceholder,
      { [styles.dragenter]: modulePlaHdClass },
    );
    return (
      <div className={styles.demo}>
        <div className={styles.container}>
          <ul id="module" className={styles.moduleUl}>
            {
              originList.map((node, key) =>
                <li
                  className={styles.moduleLi}
                  key={key}
                  id={node.id}
                  draggable
                  onDragStart={this.dragstart.bind(this)}
                  onDragEnd={this.dragend.bind(this)}
                >
                  <img
                    className="module-img"
                    src={node.smallSrc} height="96"
                    alt={node.alt}
                  />
                </li>)
            }
          </ul>
          <div
            id="moduleRemove"
            className={removeClass}
            onDragEnter={this.dragenter.bind(this)}
            onDragOver={this.dragover.bind(this)}
            onDragLeave={this.dragleave.bind(this)}
            onDrop={this.drop.bind(this)}
          >
            <span className={styles.moduleRemoveIcon}>×</span>
          </div>
          <div
            id="moduleStage"
            className={styles.moduleStage}
            onDragEnter={this.dragenter.bind(this)}
            onDragOver={this.dragover.bind(this)}
            onDragLeave={this.dragleave.bind(this)}
            onDrop={this.drop.bind(this)}
          >
            <div id="modulePlaHd" className={plaHdClass}/>
            {
              targetList.length > 0 && targetList.map((node, key) =>
                <div
                  className={styles.moduleDrag}
                  id={node.id}
                  draggable
                  data-except
                  key={key}
                  onDragStart={this.dragstart.bind(this)}
                  onDragEnd={this.dragend.bind(this)}
                >
                  <img src={node.bigSrc} alt={node.alt} />
                </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}


export default DragDrogSortDelete;
