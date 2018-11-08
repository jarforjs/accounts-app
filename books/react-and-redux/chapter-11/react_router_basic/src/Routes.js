//一开始的模样
import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import App from './pages/App.js';
// import Home from './pages/Home.js';
// import About from './pages/About.js';
// import NotFound from './pages/NotFound.js';
import store from './Store.js';

//nextState代表匹配到当前的Route
const getHomePage = (nextState, callback) =>{
  console.log(nextState,'nextState-home')
  require.ensure([],function(require){
    callback(null,require('./pages/Home.js').default);
  },'home')
}

const getAboutPage = (nextState, callback) =>{
  console.log(nextState,'nextState-about')
  require.ensure([],function(require){
    callback(null,require('./pages/About.js').default);
  },'about')
}

const getNotFoundPage = (nextState, callback) =>{
  require.ensure([],function(require){
    callback(null,require('./pages/NotFound.js').default);
  },'404')
}
// const history = browserHistory;

const history = syncHistoryWithStore(browserHistory, store);
const Routes = () => (
  <Router history={history}>
    <Route path="/" component={App}>
      {/* <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="about" component={About} />
      <Route path="*" component={NotFound} /> */}
      <IndexRoute getComponent={getHomePage} />
      <Route path="home" getComponent={getHomePage} />
      <Route path="about" getComponent={getAboutPage} />
      <Route path="*" getComponent={getNotFoundPage} />
    </Route>
  </Router>
);

export default Routes;


//另一种使用createElement链接router的方法
// import React from 'react';
// import {Router, Route, IndexRoute, browserHistory} from 'react-router';
// import {Provider} from 'react-redux';

// import {syncHistoryWithStore} from 'react-router-redux';

// import App from './pages/App.js';
// import Home from './pages/Home.js';
// import About from './pages/About.js';
// import NotFound from './pages/NotFound.js';
// import store from './Store.js';

// const createElement = (Component, props) => {
//   return (
//     <Provider store={store}>
//       <Component {...props} />
//     </Provider>
//   );
// };

// const history = syncHistoryWithStore(browserHistory, store);
// //const history = browserHistory;

// const Routes = () => (
//   <Router history={history} createElement={createElement}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Home} />
//       <Route path="home" component={Home} />
//       <Route path="about" component={About} />
//       <Route path="*" component={NotFound} />
//     </Route>
//   </Router>
// );

// export default Routes;
