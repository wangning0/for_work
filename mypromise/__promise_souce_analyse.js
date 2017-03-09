/**
 * Created by wangning on 2016/10/23.
 */
'use strict';

var asap = require('asap/raw'); //as soon as possible

function noop() {} //主要目的是生成一个空的Promise对象，为了方便promise then方法的链式调用

// States:
//
// 0 - pending //第一个加载中
// 1 - fulfilled with _value  //表示事件成功
// 2 - rejected with _value   //表示事件失败
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
    try {
        return obj.then;
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

module.exports = Promise;

function Promise(fn) {
    if (typeof this !== 'object') {
        throw new TypeError('Promises must be constructed via new');
    }
    if (typeof fn !== 'function') {
        throw new TypeError('Promise constructor\'s argument is not a function');
    }
    this._deferredState = 0; //消息队列中函数的个数
    this._state = 0;  //3表示获取另外一个promise的_state和_value
    this._value = null; //表示传递的值
    this._deferreds = null; //消息队列
    if (fn === noop) return;
    doResolve(fn, this); //promise实例化的内部函数
}
Promise._onHandle = null;
Promise._onReject = null;
Promise._noop = noop;
function doResolve(fn, promise) {
    var done = false;
    var res = tryCallTwo(fn, function (value) {  //fn的两个参数分别为resolve，另外一个是reject
        if (done) return;
        done = true;
        resolve(promise, value); // 在promise实例化对象中第一个参数调用时候的参数  resolve('success'); value表示为success，promise 表示的是promise
    }, function (reason) {
        if (done) return;
        done = true;
        reject(promise, reason);
    });
    if (!done && res === IS_ERROR) {
        done = true;
        reject(promise, LAST_ERROR);
    }
}
function tryCallTwo(fn, a, b) { //两个参数,a为resolve，b为reject
    try {
        fn(a, b);
    } catch (ex) { // 捕捉错误
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

function resolve(self, newValue) {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) {
        return reject(
            self,
            new TypeError('A promise cannot be resolved with itself.')
        );
    }
    if (
        newValue &&
        (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
        var then = getThen(newValue);
        if (then === IS_ERROR) {
            return reject(self, LAST_ERROR);
        }
        if (
            then === self.then &&
            newValue instanceof Promise
        ) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
        } else if (typeof then === 'function') {
            doResolve(then.bind(newValue), self);
            return;
        }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    if (this.constructor !== Promise) {
        return safeThen(this, onFulfilled, onRejected);
    }
    var res = new Promise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    console.log(this._deferreds, this._deferreds.onFulfilled.toString());
    return res;
};

function safeThen(self, onFulfilled, onRejected) {
    return new self.constructor(function (resolve, reject) {
        var res = new Promise(noop);
        res.then(resolve, reject);
        handle(self, new Handler(onFulfilled, onRejected, res));
    });
}
function Handler(onFulfilled, onRejected, promise){ //处理deferred事件
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
}
function handle(self, deferred) { //要处理的事件
    while (self._state === 3) {
        self = self._value;
    }
    if (Promise._onHandle) {
        Promise._onHandle(self);
    }
    if (self._state === 0) { //如果处于pending状态
        if (self._deferredState === 0) { //消息队列认为空
            self._deferredState = 1;
            self._deferreds = deferred;//进入待处理事件的消息队列
            return;
        }
        if (self._deferredState === 1) {//消息队列中存在一个待处理消息队列
            self._deferredState = 2;
            self._deferreds = [self._deferreds, deferred]; //第二个为处理事件进入消息队列
            return;
        }
        self._deferreds.push(deferred); //接下来的未处理消息都直接入队
        return;
    }
    handleResolved(self, deferred); //当状态从0开始改变的时候，则开始进行未处理事件的处理
}

function handleResolved(self, deferred) {
    asap(function() {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
            if (self._state === 1) {
                resolve(deferred.promise, self._value); //当状态为resolve的状态继续resolve
            } else {
                reject(deferred.promise, self._value);//当状态为reject的状态时继续reject
            }
            return;
        }
        var ret = tryCallOne(cb, self._value);
        if (ret === IS_ERROR) {
            reject(deferred.promise, LAST_ERROR);
        } else {
            resolve(deferred.promise, ret);
        }
    });
}
function tryCallOne(fn, a) {//触发回掉函数
    try {
        return fn(a);
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}
function resolve(self, newValue) {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) {
        return reject(
            self,
            new TypeError('A promise cannot be resolved with itself.')
        );
    }
    //为了避免传递的value里面也有promise对象
    if (
        newValue &&
        (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
        var then = getThen(newValue);
        if (then === IS_ERROR) {
            return reject(self, LAST_ERROR);
        }
        if (
            then === self.then &&
            newValue instanceof Promise
        ) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
        } else if (typeof then === 'function') {
            doResolve(then.bind(newValue), self);
            return;
        }
    }
    self._state = 1; //这个表示的是当newValue为非对象或者是函数时，状态变为resolve
    self._value = newValue; //该内部的_value变为第一个参数所传的值
    finale(self); //进行处理最后的finale，如果第一个promise内部是异步，则这个主要的作用就是触发消息队列中的函数
}

function finale(self) { //调用消息对列中的函数
    if (self._deferredState === 1) {
        handle(self, self._deferreds);
        self._deferreds = null;
    }
    if (self._deferredState === 2) {
        for (var i = 0; i < self._deferreds.length; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }
}

function reject(self, newValue) { //触发失败事件
    self._state = 2; //状态2表示为reject
    self._value = newValue;//设置value
    if (Promise._onReject) {
        Promise._onReject(self, newValue);
    }
    finale(self);
}


/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) { //初始化在开始的实例化中的promise内的函数，使其执行
    var done = false;
    var res = tryCallTwo(fn, function (value) {
        if (done) return;
        done = true;
        resolve(promise, value);
    }, function (reason) {
        if (done) return;
        done = true;
        reject(promise, reason);
    });
    if (!done && res === IS_ERROR) {
        done = true;
        reject(promise, LAST_ERROR);
    }
}

var a = new Promise(function(resolve) {
    setTimeout(function() {
        resolve(2)
    }, 1000);
})
a.then(function() {
    console.log(1);
}).then(function() {
    console.log(2);
})