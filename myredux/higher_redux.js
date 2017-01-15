/*
  高阶reducer ：
      1. reducer的复用
      2. reducer的增强
*/



/*复用, 公共代码抽离出来，然后可以通过前缀的方式进行判别*/

function generateReducer(prefix, state) {
  const LOAD_DATA = prefix + 'LOAD_DATA';

  const initialState = {...state, ...};

  return function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_DATA: 
        return {
          ...state,
          data: action.playload
        };
      default:
        return state;
    }
  }
}

/*reducer 增强*/

/* 

reducer 主要通过下面3点来增强reducer
  能够处理额外的action
  能够维护更多的state
  将不能处理的action委托给原始的reducer处理

*/

function undoable(reducer) {
  const intialState = {
    past: [],
    present: reducer(undefined, {}),
    fucure: []
  };

  return function (state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case: '@@redux-undo/UNDO': 
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        };
        // ...
        default:
        // 将其他 action 委托给原始的reducer处理
        const newPresent = reducer(present, action);

        if(present === newPresent) {
          return state;
        }

        return {
          past: [...past, present],
          present: newPresent,
          future: []
        }
    }
  }
}

