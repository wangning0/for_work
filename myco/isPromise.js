/**
 * Created by wangning on 2016/10/25.
 */

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

module.exports = isPromise;