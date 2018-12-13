import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import uuid from 'uuid';
import { Map, fromJS } from 'immutable';

// 使用Object.assign方法把EventEmitter.prototype挂载到TodoStore上
const TodoStore = assign({}, EventEmitter.prototype, {
  todos: fromJS([{ id: uuid.v4(), content: 'first one' }, { id: uuid.v4(), content: '2nd one' }]),
  history: [],
  getAll() {
    return this.todos;
  },
  addTodo(todo) {
    this.history.push(this.todos);
    /* eslint-disable new-cap */
    this.todos = this.todos.push(Map(todo));
  },
  undoTodo() {
    if (this.history.length > 0) {
      this.todos = this.history.pop();
    }
  },
  deleteTodo(id) {
    this.todos = this.todos.filter(item => (item.get('id') !== id));
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'CREATE_TODO':
      TodoStore.addTodo(action.todo);
      TodoStore.emitChange();
      break;
    case 'DELETE_TODO':
      TodoStore.deleteTodo(action.id);
      TodoStore.emitChange();
      break;
    case 'UNDO_TODO':
      TodoStore.undoTodo();
      TodoStore.emitChange();
      break;
    default:
      //  nothing to do here

  }
});
export default TodoStore;
