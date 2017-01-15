import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Frame from '../layouts/Frame';
import Home from '../views/Home.js';
import Detail from '../views/Detail.js';

// const routes = browserHistory => (
//   <Router history={browserHistory}>
//     <Route path="/" component={Frame}>
//       <IndexRoute component={Home} />
//       <Route path="/detail/:id" component={Detail} /> 
//     </Route>
//   </Router>
// )

const routes =  (
  <Router history={hashHistory}>
    <Route path="/" component={Frame}>
      <IndexRoute component={Home} />
      <Route path="/detail/:id" component={Detail} /> 
    </Route>
  </Router>
)

export default routes;