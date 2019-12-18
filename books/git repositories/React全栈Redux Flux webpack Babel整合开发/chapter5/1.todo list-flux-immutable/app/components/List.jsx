import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

// const propType = {
//   items: PropTypes.array.isRequired,
//   onDelete: PropTypes.func.isRequired
// };

function List({ items, onDelete }) {
  let itemList = items.map(item => (
    <li key={item.get('id')}>
      <button onClick={() => { onDelete(item.get('id')); }}>删除</button>
      {item.get('content')}
    </li>
  ));
  return (
    <ul>
      <h2>这是今天的待办事项</h2>
      {itemList}
    </ul>
  );
}

// List.propTypes = propType;
List.propTypes = {
  items: ImmutablePropTypes.list.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default List;
