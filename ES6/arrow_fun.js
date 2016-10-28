/**
 * Created by wangning on 2016/10/26.
 */

/*
*   在箭头函数中不能使用arguments  因为它在箭头函数中，会跟随上下文绑定到上层，所以在不确定上下文的情况下不要使用
*   箭头函数的四种用法
*
* */

let array = ['a', 'bc', 'ahs', 'sasa'];

// 1.单一参数的单行箭头函数

// var newarr = array.filter(item => item.length >= 2)
//
// console.log(newarr);

// 2.多参数的单行箭头函数

// array = array.sort((a, b) => a.length < b.length);
// console.log(array);

// 3.多行箭头函数

// foo => {
//     //...
// }
//
// (foo, bar) => {
//     //...
// }

// 4.无参数箭头函数

// () => statement;

