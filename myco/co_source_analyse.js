/**
 * Created by wangning on 2016/10/25.
 */

/*
*   co模块的缺点在于，里面只能是thunk函数或者是Promise对象！！
* */


/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;


function co(gen) {
    var ctx = this;
    var args = slice.call(arguments, 1); //默认第一个参数是generator函数

    // we wrap everything in a promise to avoid promise chaining,
    // which leads to memory leak errors.
    // see https://github.com/tj/co/issues/180
    return new Promise(function(resolve, reject) {
        if (typeof gen === 'function') gen = gen.apply(ctx, args); //判断gen是不是generator函数
        if (!gen || typeof gen.next !== 'function') return resolve(gen); //gen不是promise对象

        onFulfilled();

        /**
         * @param {Mixed} res
         * @return {Promise}
         * @api private
         */

        function onFulfilled(res) { //成功则执行该处代码
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
            return null;
        }

        /**
         * @param {Error} err
         * @return {Promise}
         * @api private
         */

        function onRejected(err) { //失败则执行该处代码
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        /**
         * Get the next value in the generator,
         * return a promise.
         *
         * @param {Object} ret
         * @return {Promise}
         * @api private
         */

        function next(ret) { //自执行generator函数核心代码
            if (ret.done) return resolve(ret.value); //如果yield已经完成则执行resolve
            var value = toPromise.call(ctx, ret.value);//将上一个yield所返回的值变成promise对象
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);//判断是否为promise对象
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(ret.value) + '"'));
        }
    });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) { //转化成promise对象
    if (!obj) return obj;
    if (isPromise(obj)) return obj;
    if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
    if ('function' == typeof obj) return thunkToPromise.call(this, obj);
    if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
    if (isObject(obj)) return objectToPromise.call(this, obj);
    return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        fn.call(ctx, function (err, res) {
            if (err) return reject(err);
            if (arguments.length > 2) res = slice.call(arguments, 1);
            resolve(res);
        });
    });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
    return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
    var results = new obj.constructor();
    var keys = Object.keys(obj);
    var promises = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var promise = toPromise.call(this, obj[key]);
        if (promise && isPromise(promise)) defer(promise, key);
        else results[key] = obj[key];
    }
    return Promise.all(promises).then(function () {
        return results;
    });

    function defer(promise, key) {
        // predefine the key in the result
        results[key] = undefined;
        promises.push(promise.then(function (res) {
            results[key] = res;
        }));
    }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) { //判断是否为promise对象
    return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
    return Object == val.constructor;
}


//demo
var fs = require('fs');
function readFile(path) {
    return function (cb) {
        fs.readFile(path,'utf-8',cb);
    }
}

co(function *() {
    var dataA = yield readFile('./isPromise.js');
    console.log(dataA);
    var dataB = yield readFile('./README.md');
    console.log(dataB);
}).then(function () {
    console.log(1);
})