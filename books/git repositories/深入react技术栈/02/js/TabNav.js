import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import { Motion, spring } from 'react-motion';
import styles from '../css/style.scss';
import InkBar from './InkBar';

function getOuterWidth(el) {
  return el.offsetWidth;
}

function getOffset(el) {
  const html = el.ownerDocument.documentElement;
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - html.clientTop,
    left: box.left + window.pageXOffset - html.clientLeft,
  };
}

@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class TabNav extends Component {
  static propTypes = {
    panels: PropTypes.object,
    activeIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      inkBarWidth: 0,
      inkBarLeft: 0,
    };
  }

  componentDidMount() {
    // 计算激活 tab 的宽度和相对屏幕的左侧位置
    const { activeIndex } = this.props;
    const node = ReactDOM.findDOMNode(this);
    const el = node.querySelectorAll('li')[activeIndex];

    this.setState({
      inkBarWidth: getOuterWidth(el),
      inkBarLeft: getOffset(el).left,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      const { activeIndex } = this.props;
      const node = ReactDOM.findDOMNode(this);
      const el = node.querySelectorAll('li')[activeIndex];

      this.setState({
        inkBarWidth: getOuterWidth(el),
        inkBarLeft: getOffset(el).left,
      });
    }
  }

  getTabs() {
    const { panels, activeIndex } = this.props;
    const rst = [];

    // children 经过 Immutable 转换后，需要使用 Immutable API 遍历
    return panels.map((child) => {
      if (!child) { return; }

      const order = parseInt(child.props.order, 10);

      let classes = classnames({
        tab: true,
        tabActive: activeIndex === order,
        disabled: child.props.disabled,
      });

      let events = {};
      if (!child.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, order),
        };
      }

      const ref = {};
      if (activeIndex === order) {
        ref.ref = 'activeTab';
      }
      return (
        <li
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order? 'true' : 'false'}
          {...events}
          styleName={classes}
          key={order}
          {...ref}
        >
          {child.props.tab}
        </li>
      );
    });
  }

  render() {
    const { activeIndex } = this.props;

    const rootClasses = classnames({
      bar: true,
    });

    const classes = classnames({
      nav: true,
    });

    return (
      <div styleName={rootClasses} role="tablist">
        <Motion style={{ left: spring(this.state.inkBarLeft) }}>
          {({ left }) => <InkBar width={this.state.inkBarWidth} left={left} />}
        </Motion>
        <ul styleName={classes}>
          {this.getTabs()}
        </ul>
      </div>
    );
  }
}

export default TabNav;
