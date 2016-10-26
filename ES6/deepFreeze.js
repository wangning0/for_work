/**
 * Created by wangning on 2016/10/26.
 */

/*
*   为了解决完全不能改变const声明的变量
* */

Object.deepFreeze = function (obj) {
    var propNames = Object.getOwnPropertyNames(obj);
    
    propNames.forEach(function (name) {
        var prop = obj[name];

        if(typeof prop == 'object' && prop !== null)
            Object.deepFreeze(prop);
    });

    return Object.freeze(obj);
};

const obj = Object.deepFreeze({
    a: {
        b: 2
    }
});

obj.a.c = 2;
console.log(obj);