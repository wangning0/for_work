/**
 * Created by wangning on 2016/10/26.
 */
/*
*   解构
* */

// Promise.then 方法中传入的是一个带有解构参数的箭头函数时，解构函数外必须要有一个括号包裹，否则会抛出语法错误

// function fetchData() {
//     return new Promise((resolve, reject) => {
//             resolve(['foo','bar']);
// });
// }
//
// fetchData().then(([value1, value2]) => {
//     console.log(value1, value2);
// });


//解构别名

const { response: data } = {
    response: ['foo', 'bar']
};

console.log(data);
// console.log(response);  //ReferenceError: response is not defined;

//解构的便捷性

const res = [
    {
        "name": "wangning",
        "lover": "caishiran",
        "age": 20,
        "info": {
            "sex": "male"
        }
    },
    {
        "name": "caishiran",
        "lover": "wangning",
        "age": 19,
        "info": {
            "sex": "female"
        }
    }
];

const resdata = res.map(
    ({name, lover, age, info: {sex: s}}) => ({
        name, lover, s
    })
)
console.log(resdata);
