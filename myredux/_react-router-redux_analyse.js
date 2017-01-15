/*
  React Router Redux的职责主要是将应用的路由信息与Redux中的store绑定在一起，为什么呢？

  原因很简单： 因为对于前端应用来说，陆游状态也是应用状态的一部分，在很多情况下，我们的业务逻辑与路由状态有很强的关联
  关系，比如，最常见的一个列表页中，分页参数、排序参数可能都会在路由中体现，而这些参数的改变必然会导致列表中的数据发生变化

  用法：
  只需要传入React Router中的history（browserHistory || hashHistory，甚至是自己创建的history）以及Redux中的store
  就可以获得一个增强后的history对象
*/

import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import reducers from './reducers';

const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);



/*
  在Redux应用中需要改变陆游路由时，也要分发一个action

  在这之前，需要对Redux的store进行一些增强，以便分发的action能够被正确识别
*/

import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const middleware = routerMiddleware(browserHistory);
const store = createStore(
  reducers,
  applyMiddleware(middleware)
);

/*
  再使用store.dispatch来分发一个路由变动的action
*/

import { push } from 'react-router-redux';

// 切换路由到 /home

store.dispatch(push('/home'));

