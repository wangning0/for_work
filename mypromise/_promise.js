/**
 * Created by wangning on 2016/10/22.
 */
/*
* promise设计思路
*   1.首先是利用实例化一个Promise类
*   2.如果promise里面没有异步调用，则立马执行Promise里面的resolve或者是reject
*   3.promise的then方法，就相当于在注册消息事件，将then里面内部的事件塞入到一个消息队列中
*   4.然后按照对队列的顺序执行
* */

//小型Promise的实现
var IS_ERROR = null;
var LAST_ERROR = {};
function noop() {}

function Promise(fn) {
    this._state = 0;
    this._deferredState = 0;
    this._deferreds = null; //message queue
    this._value = null;
    if(fn === noop) return;
    doResolve(fn, this);
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    var res = new Promise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
};
function Handler(onFulfilled, onRejected, promise) {
    this.promise = promise;
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
}
function doResolve(fn, promise) {
    var done = false;
    var res = tryCallTwo(fn, function (value) {
        if(done) return;
        done = true;
        resolve(promise, value);
    },function (reason) {
        if(done) return;
        done = true;
        reject(promise, reason);
    });
    if(!done && res === IS_ERROR) {
        reject(promise, LAST_ERROR);
    }
}

function resolve(self, newValue) {
    self._state = 1;
    self._value = newValue;
    finale(self);
}

function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
}

function finale(self) {
    if(self._deferredState === 1) {
        handle(self, self._deferreds);
        self._deferreds = null;
    }
    if(self._deferredState === 2) {
        for(var i = 0; i < self._deferreds.length; i++) {
            handle(self,self._deferreds[i]);
        };
        self._deferreds = null;
    }
}

function handle(self, deferred) {
    if(self._state == 0) {
        if(self._deferredState == 0) {
            self._deferredState = 1;
            self._deferreds = deferred;
            return;
        }
        if(self._deferredState == 1) {
            self._deferredState = 2;
            self._deferreds = [self._deferreds, deferred];
            return;
        }
        self._deferreds.push(deferred);
        return;
    }
    handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
    var cb = self._state == 1 ? deferred.onFulfilled : deferred.onRejected;
    var ret = tryCallOne(cb, self._value);
    if(ret === IS_ERROR) {
        reject(deferred.promise, LAST_ERROR);
    } else {
        resolve(deferred.promise, ret);
    }
}

function tryCallTwo(fn,a,b) {
    try {
        fn(a, b);
    } catch(ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

function tryCallOne(fn, a) {
    try {
        return fn(a);
    } catch(ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}


//demo

var p2 = new Promise(function (resolve,reject) {
    resolve(1);
});
p2.then(function (value) {
    console.log(value);
    return value+1;
}).then(function (a) {
    console.log(a);
})