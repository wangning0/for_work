function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

/*
  thunk函数主要的思想，就是判断传入的action是不是函数，如果是函数，则继续让它执行，直到接收的
  action不是函数，从而实现异步处理。

  但是会造成有很多的模版代码的重复
  
*/

// 使用 

function getWeather(url, params) {
  return (dispatch, getState) => {
    fetch(url, params)
      .then(result => {
        dispatch({
          type: 'GET_WEATHER_SUCCESS',
          playload: result
        })
      })
      .catch( err => {
        dispatch({
          type: 'GET_WEATHER_ERROR',
          playload: err
        })
      })
  }
}
