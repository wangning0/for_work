/**
 * Created by wangning on 2016/10/24.
 */
/*
*   for-in循环
*       除了遍历数组元素之外，还会遍历自定义属性。可能会按照随机顺序遍历数组元素
*
* */

// generators 简介

/*
*   当生成器的堆栈结构(本地变量、参数、临时值、生成器内部当前的执行位置)被移出堆栈
*   然而，生成器对象保留了对这个堆栈结构的引用(备份)，所以稍后调用.next()可以宠幸激活堆栈结构并且继续执行。
*
*   值得特别一提的是，生成器不是线程。生成器运行时，他和调用者在同一个线程中，拥有确定的连续执行顺序，永不并发。
*   与系统线程不同的是，生成器只有在其函数体内标记为yield的点才会暂停。
*
* */

function* quips(name) {
    yield "你好" + name + "!";
    yield "希望你能喜欢这个ES6的译文";
    if(name.startsWith("X")) {
        yield "你的名字" + name + "首字母是X，这很酷";
    }
    yield "see u again";
}

var iter = quips("Xangning");
console.log(iter);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

//可以通过实现[Symbol.iterator]() 和 .next()两个方法就可以创建自定义迭代器

class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if(value < this.stop) {
            this.value++;
            return {done: false, value: value };
        } else {
            return {done: true, value: undefined};
        }
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
    console.log(value);
}

//generator异步不便利

/*
*   将异步操作十分的便捷，但是流程管理不方便，不知道何时执行第一阶段，何时执行第二阶段
*
* */

// var fetch = require('node-fetch');
//
// function* gen() {
//     var url = 'http://test_api.com';
//     var result = yield fetch(url);
//     console.log(result.bio);
// }
// var g = gen();
// var result = g.next();
// result.value.then(function (data) {
//     return data.json();
// }).then(function (data) {
//     g.next(data);
// });


//Thunk函数是实现传名调用的一种实现机制，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体，这个临时函数就是Thunk函数
//Javascript中的Thunk函数更多的是将多参数函数，替换成单函数的形式

//ES5的实现Thunk函数
var Thunk_es5 = function (fn) {
    return function () {
        var args = Array.prototype.slice(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this,args);
        }
    }
};
//ES6实现Thunk函数
var Thunk_es6 = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    }
}

//thunkify源码实现

var thunkify = function (fn) {
    return function () {
        var ctx = this;
        var args = new Array(arguments.length);

        for(var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }

        return function (done) {
            var called;
            args.push(function () {
                if(called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (error) {
                done(error);
            }
        }
    }
};

function f(a, b, callback){
    var sum = a + b;
    callback(sum);
    callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 3)(print);


//实现generator自动执行的原理，就是在回调函数中去交还yield的函数控制权

function run(fn) {
    var gen = fn();
    
    function next(err, data) {
        var result = gen.next(data);
        if(result.done) return;
        result.value(next);
    }

    next();
}

function* g() {
    //...
}

run(g);

//co模块


