import React from 'react';

// 兄弟B
//不能这么写，这样写返回的是一个undefined
// export const B = props => (
const B = props => (
    <div className="card">
        我是Brother B, value是：
      {props.value}
    </div>
);

export default B;