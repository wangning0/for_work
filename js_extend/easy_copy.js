/**
 * Created by wangning on 2016/10/20.
 */

/*
*   浅拷贝
*   只是将内存地址拷贝给了子对象
*   不是真正的拷贝，因此存在父对象被篡改的可能
*   当父对象的属性等于数组或是另一个对象时
*   非对象时，是值拷贝
*
*   浅拷贝只能拷贝基本类型的数据
* */

function easyCopy(obj) {
    var copyObj = {};
    for (var i in obj) {
        copyObj[i] = obj[i];
    }
    return copyObj;
}

var a = {name:'wangning',arr:[1,2,3]};
var b = easyCopy(a);
b.arr.push(4);
console.log(a.arr); //[ 1, 2, 3, 4 ]
console.log(b.arr); //[ 1, 2, 3, 4 ]
