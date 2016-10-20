/**
 * Created by wangning on 2016/10/20.
 */
/*
*   深拷贝 就是能够实现真正意义上的数组和对西那个的拷贝，递归调用浅拷贝就可以了
*
* */

function deepCopy(p,c) {
    var c = c || {};
    for(var i in p) {
        if(typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i],c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

var p = {
    name:'wang',
    arr:[1,2,3,4]
};
var c = deepCopy(p);

p.arr.push(5);
console.log(c); // 1,2,3,4
console.log(p); // 1,2,3,4,5