import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

const store = createStore(rootReducer)

function abc(...args){
  console.log(args)
}
abc(store.dispatch)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
