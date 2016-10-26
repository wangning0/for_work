/**
 * Created by wangning on 2016/10/26.
 */
/*
*   ES5中forEach方法需要传入一个回调函数用来接收循环的每一个循环元素并作为循环体来执行
*       三个参数为：当前值，当前索引，数组本身
*
*   ES6中，数组类型被赋予了 entries 属性，它可以返回对应的数组中每一个元素与其下标配对的一个新数组
*
* */


const peoplesInfo = [
    {name: 'wangning', age: 12, sex: 'male'},
    {name: 'caishiran', age: 12, sex: 'female'}
];

for (const [index, {name, age}] of peoplesInfo.entries()) {
    console.log(`${index}. ${name}. ${age}`);
}


// Promise.then 方法中传入的是一个带有解构参数的箭头函数时，解构函数外必须要有一个括号包裹，否则会抛出语法错误

function fetchData() {
    return new Promise((resolve, reject) => {
            resolve(['foo','bar']);
});
}

fetchData().then(([value1, value2]) => {
    console.log(value1, value2);
});

//