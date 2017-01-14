// 异步请求都是利用promise来完成的
import { isFSA } from 'flux-standard-action';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}

/*/
  redux-promise 兼容了FSA标准，也就是说将返回的结果保存在payload中

  判断action或者action.playload 是否为promise，如果是就then，返回的结果再执行一次dispatch
*/

// demo

const fetchData = (url, params) => fetch(url, params);

async function getWeather(url, params) {
  const result = await fetchData(url, params);

  if(result.error) {
    return {
      // ...error
    }
  }

  return {
    // ...success
  }
}