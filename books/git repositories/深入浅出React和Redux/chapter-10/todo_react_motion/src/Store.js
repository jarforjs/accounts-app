import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';

import Perf from 'react-addons-perf'

const win = window;
win.Perf = Perf

const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant')());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const initialState = {
  todos: [
    {
      id: 0,
      text: 'First',
      completed: true
    },
    {
      id: 1,
      text: 'Second',
      completed: false
    },
    {
      id: 2,
      text: 'Third',
      completed: true
    },
    {
      id: 3,
      text: 'First',
      completed: true
    },
    {
      id: 4,
      text: 'Second',
      completed: false
    },
    {
      id: 5,
      text: 'Third',
      completed: true
    },
    {
      id: 6,
      text: 'First',
      completed: true
    },
    {
      id: 7,
      text: 'Second',
      completed: false
    },
    {
      id: 8,
      text: 'Third',
      completed: true
    },
    {
      id: 9,
      text: 'First',
      completed: true
    },
    {
      id: 10,
      text: 'Second',
      completed: false
    },
    {
      id: 11,
      text: 'Third',
      completed: true
    }
  ]

}
export default createStore(reducer, initialState, storeEnhancers);

