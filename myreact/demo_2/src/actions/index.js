import * as types from '../constants/ActionTypes'

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ typd: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDID_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export clearCompleted = () => ({ type: types.CLEAR_COMPLETED })