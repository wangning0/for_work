/**
 * Created by wangning on 2016/10/27.
 */

function merge(target = {}, ...objs) {
    for(const obj of objs) {
        const keys = Object.keys(obj)

        for (const key of keys) {
            target[key] = obj[key]
        }
    }
    return target
}

console.log(merge({a: 1}, {b: 1}, {c: 1}));

//函数的解构传参

function sum(...numbers) {
    return numbers.reduce((a, b) => a + b)
}

console.log(sum(...[1, 2, 3]));