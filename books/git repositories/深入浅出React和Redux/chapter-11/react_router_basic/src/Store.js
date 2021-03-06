import {createStore, compose, combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({
  routing: routerReducer
});
// const reducer = f => f;
const win = window;
const storeEnhancers = compose(
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const initialState = {};
export default createStore(reducer, initialState, storeEnhancers);

// import {createStore, combineReducers, compose} from 'redux';
// import {routerReducer} from 'react-router-redux';

// const reducer = combineReducers({
//   routing: routerReducer
// });

// const win = window;
// const storeEnhancers = compose(
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

// const initialState = {};
// export default createStore(reducer, initialState, storeEnhancers);