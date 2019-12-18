import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

const TodoItem = ({onToggleItem, onRemoveItem, completed, text,id }) => {
  const checkedProp = completed ? {checked: true} : {};
  return (
    <li
      className="todo-item"
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
      {/* <input className="toggle" type="checkbox" {...checkedProp} readOnly onClick={onToggle} /> */}
      <input className="toggle" type="checkbox" {...checkedProp} readOnly onClick={onToggleItem} />
      <label className="text">{text}</label>
      {/* <button className="remove" onClick={onRemove}>×</button> */}
      <button className="remove" onClick={onRemoveItem}>×</button>
    </li>
  );
}


TodoItem.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return{
    onToggleItem:()=>ownProps.onToggle(ownProps.id),
    onRemoveItem:()=>ownProps.onRemove(ownProps.id)
  }
}
// export default TodoItem;
//还是浪费性能！
// export default connect()(TodoItem)
export default connect(null,mapDispatchToProps)(TodoItem)
