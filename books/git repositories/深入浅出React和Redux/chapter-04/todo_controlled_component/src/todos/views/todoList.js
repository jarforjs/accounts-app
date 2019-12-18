import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import TodoItem from './todoItem.js';
import {toggleTodo, removeTodo} from '../actions.js';
import {FilterTypes} from '../../constants.js';


//无状态组件是没有shouldComponentUpdate函数的，所以不管父组件传入的props有没有变化都会造成自组件的渲染造成浪费
//单个组件优化：除了对prop类型（字符串或者数字）的浅层比较，对于复杂对象“浅层比较”只看这两个props是不是同一对象的引用。例如在jsx中使用组件Foo的的时候给名为style的prop赋值：<Foo style={{color :"red"}}/>，foo利用react-redux提供的shouldComponentUpdate函数实现，每一次都会认为style这个prop发生了变化，每次都会产生一个新的对象给style，在“浅层比较”中只比较一层不会去对里面的对象比较。想让react-redux认为前后对象类型prop是相同的，就必须保证prop指向同一个javascript对象。对于foo组件的改进：const fooStyle={color:"red"};<Foo style={fooStyle} />
//其实同样的情况也存在于函数类型的prop，react-redux无从知道两个不同的函数是不是做着一样的事情，要想让它认为两个prop是相同的，就必须让这两个prop指向同样一个函数，如果每次传给prop的都是一个新创建的函数，那肯定没法让prop指向统一额函数了。详细内容在第四章的todo_controlled_component/src/todos/views/todoList.js代码
//mapDispatchToProps还有第二个参数ownProps，就是父组件渲染当前组件时传递过来的props。
const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
  return (
    <ul className="todo-list">
    {
      todos.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          completed={item.completed}
          onToggle={onToggleTodo}
          onRemove={onRemoveTodo}
          id={item.id}
          // onToggle={() => onToggleTodo(item.id)}
          // onRemove={() => onRemoveTodo(item.id)}
        />
        ))
    }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed);
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps = (state) => {
  return {
    todos: selectVisibleTodos(state.todos, state.filter)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    onRemoveTodo: (id) => {
      dispatch(removeTodo(id));
    }
  };
};

/*
const mapDispatchToProps = (dispatch) => bindActionCreators({
  onToggleTodo: toggleTodo,
  onRemoveTodo: removeTodo
}, dispatch);
*/

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

